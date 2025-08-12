"use client";

import { useCartStore, CartItem } from '@/lib/store/cart';
import { useState } from 'react';

// In a real app, the full product object with all variants would be passed
type AddToCartFormProps = {
  product: {
    id: string; // The product ID
    name: string;
    // For simplicity, we assume the first variant is chosen
    // and we get its details directly. A real implementation
    // would have a variant selector.
    chosenVariant: {
      id: string; // The variant ID
      price: number;
      currency: string;
      image: string;
    };
  };
};

export default function AddToCartForm({ product }: AddToCartFormProps) {
  const { addItem, openDrawer } = useCartStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddToCart = () => {
    const itemToAdd: Omit<CartItem, 'quantity'> = {
      id: product.chosenVariant.id,
      name: product.name, // We use the main product name
      price: product.chosenVariant.price,
      currency: product.chosenVariant.currency,
      image: product.chosenVariant.image,
    };

    addItem(itemToAdd);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000); // Hide message after 2s
    openDrawer();
  };

  return (
    <div className="mt-8">
      {/* Placeholder for variant selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text-secondary">Size</label>
        <select className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary sm:text-sm">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full rounded-lg bg-primary px-6 py-3 font-bold text-white hover:bg-opacity-90"
      >
        Order Now — Pay on Delivery
      </button>
      {showConfirmation && (
        <p className="mt-2 text-center text-green-600">Added to cart!</p>
      )}
    </div>
  );
}
