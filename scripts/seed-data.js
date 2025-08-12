// scripts/seed-data.js

/*
 * This script is intended to seed your database or search index (e.g., Meilisearch)
 * with initial product data for development and testing.
 *
 * It can be run from the command line: `node scripts/seed-data.js`
 */

const sampleProducts = [
  {
    id: 'prod_1',
    name: 'Classic T-Shirt',
    description: 'A comfortable and stylish t-shirt.',
    price: 25.00,
    category: 'Apparel',
    imageUrl: 'https://picsum.photos/seed/prod_1/400/400',
    rating: 4.5,
    stock: 100,
    supplierId: 'supplier_A',
    syncId: 'sync_xyz123',
  },
  {
    id: 'prod_2',
    name: 'Wireless Headphones',
    description: 'High-quality sound without the wires.',
    price: 79.99,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/prod_2/400/400',
    rating: 4.8,
    stock: 50,
    supplierId: 'supplier_B',
    syncId: 'sync_xyz456',
  },
  // Add more sample products here...
];

async function seed() {
  console.log('Seeding data...');
  // TODO: Implement the logic to connect to Meilisearch or another service
  // and push the sampleProducts data.

  // Example for Meilisearch:
  // const { MeiliSearch } = require('meilisearch');
  // const client = new MeiliSearch({
  //   host: process.env.NEXT_PUBLIC_MEILISEARCH_HOST,
  //   apiKey: process.env.MEILISEARCH_API_KEY,
  // });
  //
  // const index = client.index('products');
  // const response = await index.addDocuments(sampleProducts);
  // console.log(response);

  console.log('Data seeding complete (placeholder).');
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
