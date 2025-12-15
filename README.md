# E-Commerce Store

A modern e-commerce application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Product Listing**: Browse products with search functionality
- **Product Details**: View detailed product information with variant selection
- **Shopping Cart**: Add products to cart with quantity management
- **Checkout Integration**: Seamless checkout flow with Monmi OAuth
- **Demo Mode**: Fake data mode for testing without API integration
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + custom components
- **State Management**: Zustand (cart state)
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Drawer**: Vaul
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# Leave empty for demo mode with fake data
NEXT_PUBLIC_CUSTOMER_API=
NEXT_PUBLIC_STORE_ID=
NEXT_PUBLIC_CHECKOUT_URL=https://checkout.monmi.com
```

For real mode, fill in the values:

```env
NEXT_PUBLIC_CUSTOMER_API=https://your-api-url.com
NEXT_PUBLIC_STORE_ID=your-store-id
NEXT_PUBLIC_CHECKOUT_URL=https://checkout.monmi.com
```

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
pnpm build
pnpm start
```

### Docker

Run with Docker Compose:

```bash
docker compose up -d --build
```

## Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Products listing page
│   └── products/[id]/       # Product detail page
│       └── page.tsx
├── components/              # React components
│   ├── ui/                  # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── drawer.tsx
│   ├── cart-drawer.tsx      # Shopping cart drawer
│   ├── demo-mode-banner.tsx # Demo mode notification
│   ├── header.tsx           # Site header
│   ├── product-card.tsx     # Product card component
│   ├── product-list.tsx     # Product grid
│   └── providers.tsx        # App providers (Query, Toast)
├── lib/                     # Utilities and logic
│   ├── api/                 # API clients
│   │   ├── client.ts        # Axios client
│   │   ├── products.ts      # Products API
│   │   └── cart.ts          # Cart API
│   ├── hooks/               # Custom React hooks
│   │   ├── useCart.ts       # Cart hook
│   │   └── useProducts.ts   # Products hooks
│   ├── stores/              # State management
│   │   └── cart-store.ts    # Zustand cart store
│   ├── types/               # TypeScript types
│   │   └── product.ts       # Product types
│   └── utils/               # Utility functions
│       ├── cn.ts            # Class name merger
│       └── env.ts           # Environment helpers
└── public/                  # Static assets
    └── images/              # Image assets
```

## Features in Detail

### Demo Mode vs Real Mode

**Demo Mode** (when `NEXT_PUBLIC_CUSTOMER_API` or `NEXT_PUBLIC_STORE_ID` is not set):
- Uses fake product data
- Shows demo mode banner
- Cart works locally
- Checkout is disabled

**Real Mode** (when environment variables are set):
- Fetches products from API
- Full checkout integration
- Real-time product data

### Product Data Structure

Products support multiple models (variants) with configurable attributes:

```typescript
{
  id: string
  name: string
  description?: string
  image: string
  hsCode?: string
  category?: { id: string, name: string }
  models: [
    {
      id: string
      name: string
      price: number // in cents
      weight: number
      configs: [
        {
          id: string
          value: string
          attribute: { id: string, name: string }
        }
      ]
    }
  ]
  defaultModel: { ... }
}
```

### Cart Management

The cart uses Zustand with localStorage persistence:
- Add items with variant selection
- Update quantities (min: 1)
- Remove individual items
- Clear entire cart
- Persistent across page reloads

### Checkout Flow

1. User adds products to cart
2. Opens cart drawer
3. Reviews items and quantities
4. Clicks "Proceed to Checkout"
5. Creates temporary cart via API
6. Redirects to checkout URL with cart code

## API Integration

### Products API

**List Products:**
```
GET /api/v1/products
Params:
  - storeId: string (required)
  - search: string (optional)
  - isGettingDefaultModel: true
  - isGettingModels: true
```

**Get Product:**
```
GET /api/v1/products/:id
Params:
  - storeId: string (required)
  - isGettingDefaultModel: true
  - isGettingModels: true
```

### Cart API

**Create Temp Cart:**
```
POST /api/v1/temp-carts
Body:
{
  storeId: string
  items: [
    {
      id: string
      name: string
      price: number // in cents
      weight: number
      quantity: number
      product: {
        id: string
        name: string
        image: string
        hsCode?: string
      }
    }
  ]
}
```

## Customization

### Adding New UI Components

The project uses shadcn/ui patterns. Add new components in `components/ui/`:

```tsx
import { cn } from "@/lib/utils/cn";

export function NewComponent({ className, ...props }) {
  return <div className={cn("base-styles", className)} {...props} />;
}
```

### Styling

Tailwind CSS is configured with custom animations. Extend in `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      // Add custom colors
    }
  }
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_CUSTOMER_API` | API base URL | - |
| `NEXT_PUBLIC_STORE_ID` | Store ID for API requests | - |
| `NEXT_PUBLIC_CHECKOUT_URL` | Checkout page URL | `https://checkout.monmi.com` |

## License

MIT
