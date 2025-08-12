import { getClient } from '@/lib/apollo-client';
import { GET_PRODUCT_BY_SLUG } from '@/lib/saleor/queries';
import ProductGallery from '@/components/products/ProductGallery';
import AddToCartForm from '@/components/products/AddToCartForm';
import { notFound } from 'next/navigation';

// Define the expected shape of the data, now including variants
interface ProductData {
  product: {
    id: string;
    name: string;
    description: string;
    media: {
      url: string;
      alt: string;
    }[];
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
    variants: {
      id: string;
      name: string;
    }[];
  };
}

type PdpProps = {
  params: {
    slug: string;
  };
};

export default async function ProductDetailPage({ params }: PdpProps) {
  const { data } = await getClient().query<ProductData>({
    query: GET_PRODUCT_BY_SLUG,
    variables: { slug: params.slug },
  });

  if (!data.product || !data.product.variants || data.product.variants.length === 0) {
    notFound();
  }

  const { product } = data;
  const price = product.pricing.priceRange.start.gross;
  // For now, we'll just use the first variant and first image for the cart
  const chosenVariant = {
    id: product.variants[0].id,
    price: price.amount,
    currency: price.currency,
    image: product.media[0]?.url || '',
  };

  const productForForm = {
    id: product.id,
    name: product.name,
    chosenVariant: chosenVariant,
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery media={product.media} />
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{product.name}</h1>
          <p className="mt-2 text-2xl font-bold text-text-primary">
            {price.amount.toFixed(2)} {price.currency}
          </p>
          <div
            className="prose lg:prose-lg mt-4 text-text-secondary"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <AddToCartForm product={productForForm} />

          {/* Trust Badges */}
          <div className="mt-4 text-center text-sm text-text-secondary">
            <span>✓ Secure Payment</span>
            <span className="mx-2">|</span>
            <span>✓ Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
