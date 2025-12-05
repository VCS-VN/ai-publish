# Quick Start Guide

Get your e-commerce store running in 3 steps!

## 1. Install Dependencies

```bash
pnpm install
```

## 2. Start Development Server

```bash
pnpm dev
```

The app will be available at: **http://localhost:3000**

## 3. Explore the App

### 🏠 Home Page
Visit `/` to see the landing page with hero section and features

### 🛍️ Products Page
Visit `/products` to browse all available products

### 🔍 Product Details
Click any product to see detailed information

### 🛒 Shopping Cart
- Click the cart icon in the header
- Add products using the "Add to Cart" button
- Manage quantities in the cart page

## Demo Mode

By default, the app runs in **Demo Mode** with fake data. You'll see a "Demo Mode - Fake Data" badge on the products pages.

## Connecting to Real API (Optional)

To connect to a real API, create/edit `.env.local`:

```env
# Your API endpoint
CUSTOMER_API=https://your-api-endpoint.com

# Your store ID (if using Monmi)
NEXT_PUBLIC_STORE_ID=your-store-id
```

Then restart the dev server.

## Available Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero and features |
| `/products` | Product listing page |
| `/products/[id]` | Individual product details |
| `/cart` | Shopping cart |

## Key Commands

```bash
# Development
pnpm dev          # Start dev server on port 3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
```

## Features to Try

1. **Browse Products**: Visit `/products` and see the responsive grid
2. **View Product**: Click any product to see details
3. **Add to Cart**: Click "Add to Cart" buttons
4. **Manage Cart**:
   - Update quantities with +/- buttons
   - Remove items with trash icon
   - Clear entire cart
5. **Responsive Design**: Resize your browser to see mobile/tablet layouts

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Next.js will automatically try 3001, 3002, etc.

### Images Not Loading
Make sure you're connected to the internet - demo images are from Unsplash

### Clear Node Modules
If you encounter issues:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## What's Next?

Check out:
- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - Implementation details
- `lib/api/fake-data.ts` - Customize demo products
- `app/globals.css` - Customize colors and styling

## Need Help?

- Review the codebase - it's well organized and commented
- Check Next.js 16 documentation
- Review TanStack Query docs for data fetching

---

**Happy Coding! 🚀**
