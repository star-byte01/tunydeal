"use client";

import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT, UPDATE_CHECKOUT_SHIPPING, COMPLETE_CHECKOUT } from '@/lib/saleor/mutations';
import { useRouter } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const t = useTranslations('CheckoutPage');
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    streetAddress1: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createCheckout] = useMutation(CREATE_CHECKOUT);
  const [updateShipping] = useMutation(UPDATE_CHECKOUT_SHIPPING);
  const [completeCheckout] = useMutation(COMPLETE_CHECKOUT);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const checkoutLines = items.map(item => ({
        quantity: item.quantity,
        variantId: item.id,
      }));

      // 1. Create checkout
      const { data: createData } = await createCheckout({
        variables: {
          input: {
            lines: checkoutLines,
            email: `customer-${Date.now()}@example.com`, // Using a dummy email
            shippingAddress: { ...formData, country: 'TN' },
          },
        },
      });

      const checkoutId = createData?.checkoutCreate?.checkout?.id;
      if (!checkoutId || createData?.checkoutCreate?.errors?.length > 0) {
        throw new Error('Failed to create checkout: ' + createData?.checkoutCreate?.errors.map((e: any) => e.message).join(', '));
      }

      // 2. Complete checkout (COD doesn't require a separate shipping update)
       const { data: completeData } = await completeCheckout({
        variables: {
          id: checkoutId,
          paymentData: {
             gateway: "mirakl.tunisia.cod", // COD gateway
          }
        },
      });

      if (!completeData?.checkoutComplete?.order || completeData?.checkoutComplete?.errors?.length > 0) {
        throw new Error('Failed to complete checkout: ' + completeData?.checkoutComplete?.errors.map((e: any) => e.message).join(', '));
      }

      const order = completeData.checkoutComplete.order;

      // 3. On success, clear cart and redirect
      clearCart();
      router.push(`/order-confirmation/${order.id}`);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">{t('cartEmptyTitle')}</h1>
        <p className="mt-4">{t('cartEmptyMessage')}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold">{t('shippingTitle')}</h2>
          <div>
            <label htmlFor="firstName">{t('firstName')}</label>
            <input type="text" name="firstName" id="firstName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="lastName">{t('lastName')}</label>
            <input type="text" name="lastName" id="lastName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="phone">{t('phone')}</label>
            <input type="tel" name="phone" id="phone" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="city">{t('city')}</label>
            <input type="text" name="city" id="city" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="streetAddress1">{t('address')}</label>
            <textarea name="streetAddress1" id="streetAddress1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" onChange={handleInputChange} />
          </div>
          {error && (
            <div className="rounded-md bg-red-100 p-4 text-sm text-red-700">
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3 font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? t('processing') : t('confirmOrder')}
          </button>
        </form>

        {/* Order Summary */}
        <div className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-semibold">{t('orderSummaryTitle')}</h2>
          <ul className="mt-4 divide-y divide-gray-200">
            {items.map(item => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 font-bold text-lg">
            <span>{t('total')}</span>
            <span>{getTotalPrice().toFixed(2)} TND</span>
          </div>
        </div>
      </div>
    </div>
  );
}
