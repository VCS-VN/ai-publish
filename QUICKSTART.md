# Quick Start Guide

## 🎉 Your E-Commerce Store is Ready!

The application is currently running in **Docker** and accessible via your browser.

## Current Status

✅ **Server Running** - Next.js development server is live
✅ **Demo Mode Active** - Using fake product data
✅ **All Features Working** - Products, cart, and checkout (disabled in demo)

## Access Your Application

The app is running at: **http://localhost:3000** (or your configured Docker port)

## What You'll See

### 1. **Home Page** (`/`)
- Product grid with 3 sample products
- Search bar to filter products
- Yellow banner: "You are in Demo Mode..."
- Shopping cart icon in header

### 2. **Product Detail** (`/products/:id`)
- Large product image
- Product name, category, and description
- Variant selection (Color, Size, etc.)
- Quantity selector
- "Add to Cart" button
- Back button to return to listing

### 3. **Shopping Cart** (Click cart icon)
- Drawer slides in from left (desktop) or bottom (mobile)
- Shows all cart items with images
- Quantity controls (+/-)
- Remove item button
- Subtotal calculation
- "Proceed to Checkout" button (disabled in demo mode)
- "Clear Cart" button

## Test the Application

### Basic Flow:

1. **Browse Products**
   - Visit home page
   - See 3 products: T-Shirt, Jeans, Running Shoes
   - Try searching: "shirt", "jeans", "shoes"

2. **View Product Details**
   - Click any product card
   - See variant options (Color, Size, etc.)
   - Select different variants → price updates
   - Adjust quantity using +/- buttons

3. **Add to Cart**
   - Select all required variants
   - Set quantity (min: 1)
   - Click "Add to Cart"
   - See success toast notification
   - Cart badge updates with total items

4. **Manage Cart**
   - Click cart icon in header
   - View cart items in drawer
   - Update quantities with +/- buttons
   - Remove items with trash icon
   - See subtotal update in real-time
   - Try "Clear Cart" button

5. **Checkout (Demo Mode)**
   - Note: "Proceed to Checkout" is disabled
   - Message: "Checkout is not available in demo mode"

## Enable Real Mode

To connect to real API and enable checkout:

1. **Stop the container:**
   ```bash
   docker compose down
   ```

2. **Edit `.env.local`:**
   ```env
   NEXT_PUBLIC_CUSTOMER_API=https://your-api-url.com
   NEXT_PUBLIC_STORE_ID=your-store-id
   NEXT_PUBLIC_CHECKOUT_URL=https://checkout.monmi.com
   ```

3. **Restart:**
   ```bash
   docker compose up -d
   ```

4. **Changes in Real Mode:**
   - ✅ Yellow banner disappears
   - ✅ Products load from API
   - ✅ Search queries API
   - ✅ Checkout enabled
   - ✅ Creates temp cart and redirects

## Sample Products (Demo Mode)

### 1. Classic T-Shirt ($29.99)
- **Variants:** Color (Blue, Red) × Size (Small, Medium)
- **Models:** 4 combinations
- **Price:** $29.99 - $31.99

### 2. Denim Jeans ($59.99)
- **Variants:** Waist (30, 32, 34)
- **Models:** 3 options
- **Price:** $59.99 - $61.99

### 3. Running Shoes ($79.99)
- **Variants:** Color (Black, White) × Size (9, 10)
- **Models:** 4 combinations
- **Price:** $79.99 - $81.99

## Common Actions

### Restart Application
```bash
docker compose restart
```

### View Logs
```bash
docker compose logs -f
```

### Rebuild
```bash
docker compose up -d --build
```

### Stop Application
```bash
docker compose down
```

## Features Checklist

- ✅ Product listing with grid layout
- ✅ Product search functionality
- ✅ Product detail page with images
- ✅ Multi-variant selection (color, size, etc.)
- ✅ Dynamic price based on selected variant
- ✅ Quantity selector (min: 1)
- ✅ Add to cart with toast notification
- ✅ Cart drawer (responsive)
- ✅ Cart badge with item count
- ✅ Update cart quantities
- ✅ Remove cart items
- ✅ Clear entire cart
- ✅ Persistent cart (localStorage)
- ✅ Subtotal calculation
- ✅ Checkout integration (real mode)
- ✅ Demo mode banner
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Image fallbacks

## Keyboard Shortcuts

- **Search:** Click input and type
- **Quantity:** Use +/- buttons or type directly
- **Close Drawer:** Click X or outside drawer
- **Back:** Browser back button or "Back" button

## Troubleshooting

### Products Not Showing
**Check:** Container is running
```bash
docker compose ps
```

### Cart Not Persisting
**Check:** Browser localStorage enabled
- Open DevTools → Application → Local Storage
- Look for key: "cart"

### Checkout Button Disabled
**Check:**
1. Are you in demo mode? (see banner)
2. Environment variables set?
3. Container restarted after .env changes?

### Images Not Loading
- Placeholder fallback is automatic
- Check browser console for errors
- Verify `/public/images/product-placeholder.png` exists

## Development Commands

```bash
# Install dependencies
pnpm install

# Run dev server locally
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## What's Next?

1. ✅ **You're ready to use the app!**
2. 🎨 Customize styling in `tailwind.config.ts`
3. 📦 Add more products in `lib/api/products.ts`
4. 🔌 Connect real API by updating `.env.local`
5. 🚀 Deploy to Vercel, Railway, or any Docker host

## Need Help?

- Check **README.md** for full documentation
- Review **PROJECT_SUMMARY.md** for detailed setup info
- View logs: `docker compose logs -f`

---

**Enjoy your new e-commerce store! 🛍️**
