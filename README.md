# TunyDeal Storefront

This repository contains the Next.js frontend for TunyDeal, a multi-category marketplace for Tunisia.

## ✨ Features

- **Next.js 14 App Router**: Modern, performant React framework with i18n support.
- **Tailwind CSS**: Utility-first CSS with a custom design token system.
- **Saleor GraphQL Backend**: Headless commerce platform integration.
- **Zustand**: Client-side state management for the shopping cart.
- **Cash on Delivery (COD)**: Optimized checkout flow for the Tunisian market.
- **CI/CD with GitHub Actions**: Automated linting, testing, and deployment.
- **Storybook**: Component library and design system documentation.
- **Testing**: Unit tests with Vitest and E2E tests with Playwright.
- **Dockerized Dev Environment**: Includes Next.js app, Meilisearch, and a mock Saleor API.
- **Image Watermarking**: Server-side image processing proxy.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- NPM
- Docker and Docker Compose

### Option 1: Local Development with Docker (Recommended)

This is the easiest way to get started, as it spins up the entire environment, including mock backend services.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd tunydeal-storefront
    ```

2.  **Set up environment variables:**
    Copy the example environment file. The default values are configured to work with the Docker setup.
    ```bash
    cp .env.example .env.local
    ```

3.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```
    The application will be available at `http://localhost:3000`.

### Option 2: Running the Frontend Manually

1.  **Install dependencies:**
    The frontend application is located in the `apps/frontend` directory.
    ```bash
    cd apps/frontend
    npm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🧪 Testing

All test commands should be run from the `apps/frontend` directory.

- **Unit Tests**: `npm run test`
- **E2E Tests**: `npm run e2e`
- **Linting**: `npm run lint`
- **Formatting**: `npm run format`

## storybook

To view the component library (from `apps/frontend`):
```bash
npm run storybook
```

## 📜 Scripts

### Product Sync Worker

A script is provided to fetch products from Saleor and cache them as a JSON file. This can be used to feed data to other services or for build-time data sourcing.

To run it (from the project root):
```bash
node scripts/sync-worker.js
```
*Note: This requires `node-fetch` and `dotenv` to be available in the script's environment.*

## 🤝 Contributing

Please see `docs/CONTRIBUTING.md` for details on our branch strategy, commit conventions, and PR process.

## 部署

Deployment instructions are available in `docs/DEPLOYMENT.md`.

## 🚧 TODO / Tech Debt

- **Finalize Translations**: The French and Arabic translation files (`fr.json`, `ar.json`) are skeletons and need to be fully translated.
- **Checkout Logic**: The checkout page form submission is currently mocked. It needs to be fully connected to the Saleor checkout mutations.
- **Search**: A search interface and integration with Meilisearch or Algolia needs to be implemented.
- **Prettier Plugin Issue**: During development, there was an issue with the environment preventing the `prettier-plugin-tailwindcss` from being installed correctly. The plugin was removed from the Prettier config as a workaround. This should be investigated and re-enabled.
- **Admin Page**: The admin page was removed per user request, but could be added back if needed.
- **Error Handling**: Add more robust error handling and user feedback for data fetching, form submissions, etc.
- **Accessibility**: While basic accessibility has been considered, a full a11y audit should be performed.
- **Observability**: The project is set up for analytics, but more detailed performance monitoring and distributed tracing could be added.
