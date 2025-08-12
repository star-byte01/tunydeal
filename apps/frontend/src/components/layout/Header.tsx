"use client";

import Link from 'next/link';
import { useCartStore } from '@/lib/store/cart';
import MegaMenu from './MegaMenu';

// A simple cart icon component
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export default function Header() {
  const { openDrawer, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 bg-white/80 shadow-md backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            TunyDeal
          </Link>
        </div>
        <nav className="hidden md:flex">
          {/* Placeholder for Mega Menu */}
          <Link href="/products" className="px-4 py-2 text-text-secondary hover:text-primary">
            All Products
          </Link>
          <MegaMenu />
        </nav>
        <div className="flex items-center gap-4">
          {/* Placeholder for Search */}
          <button className="p-2 text-text-secondary hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>

          {/* Cart Trigger */}
          <button onClick={openDrawer} className="relative p-2 text-text-secondary hover:text-primary">
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
