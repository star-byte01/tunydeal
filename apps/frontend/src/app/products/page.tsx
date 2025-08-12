import { getClient } from '@/lib/apollo-client';
import { GET_PRODUCTS } from '@/lib/saleor/queries';
import ProductCard from '@/components/products/ProductCard';

// Define the expected shape of the data
interface ProductEdge {
  node: {
    id: string;
    name: string;
    slug: string;
    thumbnail: {
      url: string;
      alt: string;
    };
    pricing: {
      priceRange: {
        start: {
          gross: {
            amount: number;
            currency: string;
          };
        };
      };
    };
  };
}

interface ProductsData {
  products: {
    edges: ProductEdge[];
  };
}

export default async function ProductListingPage() {
  // Fetch data on the server
  const { data } = await getClient().query<ProductsData>({
    query: GET_PRODUCTS,
    variables: { first: 12 },
    // You can adjust caching behavior here
    // context: { fetchOptions: { next: { revalidate: 3600 } } },
  });

  const products = data.products.edges;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">All Products</h1>
      <p className="mt-2 text-text-secondary">
        Browse our collection of the latest and greatest deals.
      </p>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((edge) => (
          <ProductCard key={edge.node.id} product={edge.node} />
        ))}
      </div>
    </div>
  );
}
