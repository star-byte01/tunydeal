import Link from 'next/link';
import Image from 'next/image';

// Define a type for the product node for better type safety
type Product = {
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
  // Add other fields like rating as they become available
};

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.pricing.priceRange.start.gross;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg border border-border bg-white transition-shadow duration-300 group-hover:shadow-lg">
        <div className="relative aspect-square w-full">
          <Image
            src={product.thumbnail.url}
            alt={product.thumbnail.alt || product.name}
            fill
            className="object-cover"
          />
          {/* "Pay on Delivery" Badge */}
          <div className="absolute bottom-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-semibold text-white">
            Pay on Delivery
          </div>
        </div>
        <div className="p-4">
          <h3 className="truncate font-semibold text-text-primary group-hover:text-primary">
            {product.name}
          </h3>
          {/* Placeholder for rating */}
          {/* <p className="text-sm text-gray-500">★★★★☆ (4.5)</p> */}
          <p className="mt-2 font-bold text-text-primary">
            {price.amount.toFixed(2)} {price.currency}
          </p>
        </div>
      </div>
    </Link>
  );
}
