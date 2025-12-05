# E-Commerce Store

A modern, full-featured e-commerce application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 🛍️ **Product Catalog** - Browse products with beautiful grid layout
- 🔍 **Product Details** - Detailed product pages with images and descriptions
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with shadcn/ui components
- 🚀 **Fast Performance** - Optimized with Next.js 16 App Router
- 🔄 **Data Fetching** - TanStack Query for efficient data management
- 🌐 **API Ready** - Configured for Monmi OAuth integration

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Context (Cart)
- **Data Fetching**: TanStack Query + Axios
- **Icons**: Lucide React

## Project Structure

```
├── app/
│   ├── cart/              # Shopping cart page
│   ├── products/          # Product listing and detail pages
│   │   └── [id]/         # Dynamic product detail page
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Site header with cart
│   ├── ProductCard.tsx   # Product card component
│   └── providers.tsx     # App providers
├── contexts/
│   └── CartContext.tsx   # Shopping cart context
├── hooks/
│   └── useProducts.ts    # Product data hooks
├── lib/
│   ├── api/
│   │   ├── client.ts     # Axios configuration
│   │   └── fake-data.ts  # Demo data
│   └── utils.ts          # Utility functions
└── types/
    └── product.ts        # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at `http://localhost:3000`

## Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration (optional - will use fake data if not set)
CUSTOMER_API=https://your-api-endpoint.com
NEXT_PUBLIC_STORE_ID=your-store-id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Monmi OAuth Integration

When Monmi OAuth is integrated:

1. Set `CUSTOMER_API` environment variable to your API endpoint
2. Set `NEXT_PUBLIC_STORE_ID` with your Monmi store ID
3. The app will automatically fetch real product data from: `${CUSTOMER_API}/api/v1/products?storeId=${STORE_ID}`

Without Monmi OAuth, the app displays clearly labeled fake data for demonstration purposes.

## API Integration

The app is configured to work with the following API structure:

### Products Endpoint

**GET** `/api/v1/products?storeId={storeId}`

Response:
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "price": number,
      "image": "string",
      "category": "string",
      "stock": number,
      "rating": number,
      "reviews": number
    }
  ],
  "total": number
}
```

### Product Detail Endpoint

**GET** `/api/v1/products/{id}?storeId={storeId}`

Response:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": number,
  "image": "string",
  "category": "string",
  "stock": number,
  "rating": number,
  "reviews": number
}
```

## Features Breakdown

### Home Page
- Hero section with call-to-action
- Feature highlights
- Responsive layout

### Products Page
- Grid layout (1-4 columns based on screen size)
- Product cards with images, ratings, and prices
- "Demo Mode" badge when using fake data
- Loading and error states

### Product Detail Page
- Large product image
- Detailed information
- Add to cart functionality
- Stock availability
- Customer reviews display
- Product features

### Shopping Cart
- View all cart items
- Update quantities
- Remove items
- Order summary
- Clear cart option
- Checkout button

## Customization

### Adding New Products (Demo Mode)

Edit `lib/api/fake-data.ts` to add more products to the demo data.

### Styling

The app uses Tailwind CSS with custom design tokens defined in:
- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind configuration

### Components

All UI components are in `components/ui/` and can be customized individually.

## Deployment

This app can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS
- Google Cloud
- Self-hosted

## License

MIT

## Support

For questions or issues, please open an issue on the repository.
