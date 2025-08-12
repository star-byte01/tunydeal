import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '../../i18n';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ApolloProviderWrapper } from '@/components/providers/ApolloProviderWrapper';
import CartDrawer from '@/components/cart/CartDrawer';
import AnalyticsScripts from '@/components/analytics/AnalyticsScripts';
import '../../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TunyDeal',
  description: 'Your one-stop shop for the best deals in Tunisia.',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${inter.className} bg-background text-text-primary`}>
        <ApolloProviderWrapper>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </ApolloProviderWrapper>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
