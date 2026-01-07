# RIN E-Commerce Platform

## Overview

RIN is a minimalist luxury e-commerce storefront built with a React frontend and Express backend. The application features a product catalog with categories, shopping cart functionality, and a clean editorial design aesthetic. It's designed for showcasing curated products with a focus on elegant user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: 
  - Zustand for cart state (persisted to localStorage)
  - TanStack React Query for server state and API caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **Animations**: Framer Motion for page transitions and UI interactions
- **Typography**: DM Sans (sans-serif) and Playfair Display (serif) fonts

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Development**: Vite dev server with HMR proxied through Express

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` defines two main tables:
  - `categories`: Product categories with name, slug, description, imageUrl
  - `products`: Products with pricing, images array, specifications (JSONB), stock, ratings
- **Migrations**: Drizzle Kit handles schema migrations (`npm run db:push`)

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components (Home, Shop, ProductDetail)
    hooks/        # Custom React hooks (use-cart, use-shop)
    lib/          # Utilities and query client setup
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod schemas
```

### Key Design Decisions
- **Shared Types**: The `shared/` directory contains schema and route definitions used by both frontend and backend, ensuring type safety across the stack
- **Storage Pattern**: Database access is abstracted through an `IStorage` interface in `storage.ts`, making it easy to swap implementations
- **Component Library**: Using shadcn/ui provides accessible, customizable components that can be modified directly in the codebase
- **Cart Persistence**: Shopping cart uses Zustand with localStorage persistence, allowing cart state to survive page refreshes

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: Session storage (available but not currently implemented)

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for UI transitions
- **lucide-react**: Icon library
- **Radix UI**: Headless component primitives (via shadcn/ui)
- **wouter**: Lightweight routing library

### Build Tools
- **Vite**: Frontend build and development server
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across the codebase

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling