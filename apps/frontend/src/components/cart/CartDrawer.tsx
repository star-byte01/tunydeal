"use client";

import { useCartStore } from '@/lib/store/cart';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, removeItem, updateItemQuantity, getTotalPrice } = useCartStore();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeDrawer}
          />

          {/* Drawer Panel */}
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button onClick={closeDrawer} className="text-2xl">&times;</button>
              </div>

              {/* Cart Items */}
              <div className="flex-grow overflow-y-auto p-4">
                {items.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="divide-y">
                    {items.map(item => (
                      <li key={item.id} className="flex items-center gap-4 py-4">
                        <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                        <div className="flex-grow">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.price.toFixed(2)} {item.currency}</p>
                          <div className="mt-2 flex items-center">
                            <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="px-2 border rounded-md">-</button>
                            <span className="px-4">{item.quantity}</span>
                            <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} className="px-2 border rounded-md">+</button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Cart Footer */}
              <div className="border-t p-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Subtotal</span>
                  <span>{getTotalPrice().toFixed(2)} TND</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="mt-4 block w-full rounded-lg bg-primary py-3 text-center font-bold text-white hover:bg-opacity-90"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
