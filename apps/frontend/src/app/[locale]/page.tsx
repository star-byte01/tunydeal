import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  // Although this is a server component, next-intl allows using this hook
  // by getting the translations on the server.
  const t = useTranslations('ProductListingPage'); // Re-using some translations

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-secondary py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-primary">Welcome to TunyDeal</h1>
          <p className="mt-4 text-lg text-text-secondary">
            The best deals in Tunisia, with Cash on Delivery.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-bold text-white"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Cards */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Placeholder cards */}
          <div className="h-48 rounded-lg bg-gray-200 p-4">Electronics</div>
          <div className="h-48 rounded-lg bg-gray-200 p-4">Apparel</div>
          <div className="h-48 rounded-lg bg-gray-200 p-4">Home</div>
          <div className="h-48 rounded-lg bg-gray-200 p-4">Beauty</div>
        </div>
      </section>

      {/* Trending Deals Carousel */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-center text-3xl font-bold">Trending Deals</h2>
          <div className="mt-8">
            {/* Placeholder for carousel */}
            <div className="h-64 rounded-lg bg-gray-200">Carousel Placeholder</div>
          </div>
        </div>
      </section>

      {/* Top Offers this Week */}
      <section className="container mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-3xl font-bold">Top Offers This Week</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {/* Placeholder product cards */}
          <div className="h-64 rounded-lg bg-gray-200"></div>
          <div className="h-64 rounded-lg bg-gray-200"></div>
          <div className="h-64 rounded-lg bg-gray-200"></div>
          <div className="h-64 rounded-lg bg-gray-200"></div>
        </div>
        <div className="mt-8 text-center">
            <Link href="/products" className="font-bold text-primary hover:underline">
              {t('title')}
            </Link>
        </div>
      </section>
    </div>
  );
}
