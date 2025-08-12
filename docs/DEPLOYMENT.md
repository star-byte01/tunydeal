# Deployment Guide

This document provides instructions for deploying the TunyDeal storefront to Vercel.

## Environments

- **Staging**: Deployed automatically from the `staging` branch.
- **Production**: Deployed automatically from the `main` branch after PR approval.

## Vercel Setup

1.  **Import Project**: Import the Git repository into Vercel.
2.  **Framework Preset**: Select `Next.js`.
3.  **Root Directory**: Set the root directory to `apps/frontend`.
4.  **Build & Development Settings**:
    - **Build Command**: `yarn build`
    - **Install Command**: `yarn install`
    - **Development Command**: `yarn dev`
5.  **Environment Variables**: Configure the following environment variables in the Vercel project settings. These should be copied from your `.env.local` file and kept secret.

### Required Environment Variables

| Variable                        | Description                                                               | Staging Value       | Production Value    |
| ------------------------------- | ------------------------------------------------------------------------- | ------------------- | ------------------- |
| `NEXT_PUBLIC_API_URL`           | The URL of the Saleor GraphQL API.                                        | `(staging_url)`     | `(production_url)`  |
| `SALEOR_API_TOKEN`              | API token for authenticating with the Saleor backend.                     | `(secret)`          | `(secret)`          |
| `ADMIN_BASIC_PASSWORD`          | Password to access the internal admin UI.                                 | `(secret)`          | `(secret)`          |
| `SENTRY_DSN`                    | Data Source Name for Sentry error monitoring.                             | `(staging_dsn)`     | `(production_dsn)`  |
| `NEXT_PUBLIC_ENABLE_ANALYTICS`  | Set to `true` to enable GA4, Meta, and TikTok pixels.                     | `false`             | `true`              |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID`| Google Analytics 4 Measurement ID.                                        | `(staging_id)`      | `(production_id)`   |
| `NEXT_PUBLIC_META_PIXEL_ID`     | Facebook/Meta Pixel ID.                                                   | `(staging_id)`      | `(production_id)`   |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID`   | TikTok Pixel ID.                                                          | `(staging_id)`      | `(production_id)`   |
| `NEXT_PUBLIC_MEILISEARCH_HOST`  | URL for the Meilisearch instance.                                         | `(staging_url)`     | `(production_url)`  |
| `NEXT_PUBLIC_MEILISEARCH_API_KEY`| API key for Meilisearch.                                                  | `(secret)`          | `(secret)`          |

## Rollbacks

Vercel makes rollbacks easy. If a deployment introduces a critical bug, you can instantly roll back to a previous deployment from the Vercel dashboard.

1.  Navigate to the **Deployments** tab in your Vercel project.
2.  Find the deployment you want to restore.
3.  Click the "Redeploy" button (or "Promote to Production" if it was a previous production build).

## Hotfixes

For urgent fixes:
1. Create a `hotfix/*` branch from `main`.
2. Commit the fix.
3. Create a PR to merge the hotfix branch into `main` and `staging`.
4. Once merged, the fix will be deployed automatically.
