import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';
import streamifier from 'streamifier';

const router = express.Router();

// Use memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   GET /api/products
// @desc    Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/products
// @desc    Create a product with image upload or direct URL
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('--- NEW PRODUCT UPLOAD ATTEMPT ---');
    console.log('Full Request Body:', req.body);
    const { name, description, price, imageUrl: bodyImageUrl, category } = req.body;
    console.log('Resolved Category:', category);
    let finalImageUrl = bodyImageUrl || '';

    // If a file was uploaded, prioritize Cloudinary
    if (req.file) {
      console.log('Incoming file upload for:', name);
      // Helper function to upload to Cloudinary via stream
      const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'shop_products' },
            (error, result) => {
              if (result) {
                console.log('Cloudinary upload success:', result.secure_url);
                resolve(result);
              } else {
                console.error('Cloudinary upload error:', error);
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(stream);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      finalImageUrl = result.secure_url;
    } else {
      console.log('No file uploaded, using provided imageUrl:', finalImageUrl);
    }

    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      imageUrl: finalImageUrl,
      category: category || 'general'
    });

    const savedProduct = await newProduct.save();
    console.log('Product saved successfully:', savedProduct._id);
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error in POST /api/products:', err);
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
