// This script is intended to be run from the command line, e.g., via a cron job.
// It requires 'node-fetch' and 'dotenv' to be installed.
// `npm install node-fetch dotenv` in the root directory.

require('dotenv').config({ path: '.env.local' });
const fetch = require('node-fetch');
const fs = require('fs/promises');
const path = require('path');

const SALEOR_API_URL = process.env.NEXT_PUBLIC_API_URL;
const SALEOR_API_TOKEN = process.env.SALEOR_API_TOKEN;
const CACHE_FILE_PATH = path.join(process.cwd(), 'data/products.json');

const GET_ALL_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after, channel: "default-channel") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          slug
          description
          thumbnail {
            url
            alt
          }
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          # These are custom attributes you would define in Saleor
          attributes {
            attribute {
              slug
            }
            values {
              name
            }
          }
        }
      }
    }
  }
`;

async function fetchAllProducts() {
  let allProducts = [];
  let hasNextPage = true;
  let afterCursor = null;

  console.log('Starting to fetch all products from Saleor...');

  while (hasNextPage) {
    const response = await fetch(SALEOR_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SALEOR_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: GET_ALL_PRODUCTS_QUERY,
        variables: { first: 100, after: afterCursor },
      }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(`GraphQL Errors: ${JSON.stringify(errors)}`);
    }

    allProducts.push(...data.products.edges.map(edge => edge.node));
    hasNextPage = data.products.pageInfo.hasNextPage;
    afterCursor = data.products.pageInfo.endCursor;

    console.log(`Fetched ${allProducts.length} products so far...`);
  }

  console.log(`Total products fetched: ${allProducts.length}`);
  return allProducts;
}

function enrichProduct(product) {
  // Example enrichment: add an estimated delivery time and a promotional flag.
  // This could be based on product category, supplier, etc.
  const isHot = product.attributes.some(
    attr => attr.attribute.slug === 'tags' && attr.values.some(val => val.name === 'hot_deal')
  );

  return {
    ...product,
    estimatedDelivery: '1-3 business days',
    isHot: isHot,
    brandWatermark: true, // Flag to tell the frontend to use the watermarking proxy
  };
}

async function runSync() {
  if (!SALEOR_API_URL || !SALEOR_API_TOKEN) {
    throw new Error('Missing Saleor API URL or Token in environment variables.');
  }

  try {
    console.log('Starting product sync...');
    const rawProducts = await fetchAllProducts();
    const enrichedProducts = rawProducts.map(enrichProduct);

    console.log(`Enriched ${enrichedProducts.length} products.`);

    // Ensure the data directory exists
    await fs.mkdir(path.dirname(CACHE_FILE_PATH), { recursive: true });
    // Write the flattened JSON cache
    await fs.writeFile(CACHE_FILE_PATH, JSON.stringify(enrichedProducts, null, 2));

    console.log(`Successfully synced and cached products to ${CACHE_FILE_PATH}`);
  } catch (error) {
    console.error('Error during product sync:', error);
    process.exit(1);
  }
}

runSync();
