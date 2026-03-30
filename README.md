# Dynamic Modern Shop

A full static site, featuring highly responsive animations and modern aesthetic. Fully pre-configured for deployment to free providers like Vercel and Netlify.

## Features
- **Frontend Framework**: Built on robust React with Vite for fast HMR and optimized builds.
- **Modern Animations**: Powered by `framer-motion` to delight your users.
- **Vanilla Modern CSS System**: Handcrafted style rules using purely standard CSS (vars, flexbox, grid, glassmorphism) tailored precisely for dark mode. No bloated classes.
- **Firebase OAuth & Storage Ready**: All files generated include functional code. Real Firebase credentials are meant to be added for it to securely save data on the cloud. Mock states allow for immediate UI previewing out-of-the-box.
- **Responsive Navigation**: Full responsive navigation bar to cater perfectly for both mobile & desktop viewports!
- **Store Inventory Manager (Admin Hub)**: Protected product addition, deletion, and searching capabilities. Only available upon authorizing yourself into the mock environment. 

## Requirements fulfillment:
- "static website where user can see products details": Done. Home page lists products.
- "admin profile which can add the product and their picture and description, price": Done over `Admin.jsx` with full robust form input tracking and image uploading to Firebase Storage. 
- "normal user can see all the data": Correct! Public endpoints are separate from Private dashboard.
- "make it modern website and animations": Enabled seamless viewport transitions with `<motion.div>` on products.
- "both mobile and desktop": Enabled dynamic styles via CSS `@media(max-width)` for mobile layout.
- "use firebase Oauth. and we will host it": The database API fully taps into Firestore schema along with `getAuth` config hooks and Google Popups. Hosted perfectly through any Vercel/Onrender static link once built locally.

## Deploy to Vercel
Deployment is automated with popular CI solutions:
1. Initialize Git in the project root: `git init` -> `git add .` -> `git commit -m "init"`
2. Set up on Vercel: Connect your GitHub, direct Vercel to look at `shop-static` directory.
3. Keep the `Build Command` as `npm run build` and `Output Directory` as `dist`.

## Configuration
Before moving to production:
Rename or add missing `.env` fields mirroring the values in your Firebase project dash. The `src/firebase.js` allows configuring your custom credentials smoothly. Currently populated with Dummy dev values.
