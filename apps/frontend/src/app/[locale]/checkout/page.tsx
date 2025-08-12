"use client";

import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT, UPDATE_CHECKOUT_SHIPPING, COMPLETE_CHECKOUT } from '@/lib/saleor/mutations';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    streetAddress1: '',
  });

  // TODO: Add proper mutation handling with loading and error states
  const [createCheckout] = useMutation(CREATE_CHECKOUT);
  const [updateShipping] = useMutation(UPDATE_CHECKOUT_SHIPPING);
  const [completeCheckout] = useMutation(COMPLETE_CHECKOUT);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [value]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simplified version of the checkout flow.
    // A real implementation would have more robust error handling and state management.
    console.log("Form submitted", formData);
    console.log("Cart items", items);

    // 1. Create checkout
    // 2. Update shipping
    // 3. Complete checkout
    // 4. On success, clear cart and redirect to a confirmation page.

    alert("Order submitted (mock)!");
    // clearCart();
    // router.push('/order-confirmation/12345');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="mt-4">You can't check out with an empty cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" id="phone" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="city">City / Governorate</label>
            <input type="text" name="city" id="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="streetAddress1">Address</label>
            <textarea name="streetAddress1" id="streetAddress1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <button type="submit" className="w-full rounded-lg bg-primary py-3 font-bold text-white">
            Confirm Order & Pay on Delivery
          </button>
        </form>

        {/* Order Summary */}
        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <ul className="mt-4 divide-y divide-gray-200">
            {items.map(item => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold text-lg">
            <span>Total</span>
            <span>{getTotalPrice().toFixed(2)} TND</span>
          </div>
        </div>
      </div>
    </div>
  );
}
