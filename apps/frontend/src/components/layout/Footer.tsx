import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-gray-800">Shop</h3>
            <ul>
              <li><Link href="/products" className="hover:underline">All Products</Link></li>
              {/* Categories will be dynamically generated */}
              <li><Link href="/products?category=electronics" className="hover:underline">Electronics</Link></li>
              <li><Link href="/products?category=apparel" className="hover:underline">Apparel</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">About Us</h3>
            <ul>
              <li><Link href="/about" className="hover:underline">About TunyDeal</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Customer Service</h3>
            <ul>
              <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
              <li><Link href="/shipping-returns" className="hover:underline">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Legal</h3>
            <ul>
              <li><Link href="/legal/terms-of-service" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="/legal/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} TunyDeal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
