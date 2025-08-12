"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

type OrderConfirmationPageProps = {
  params: {
    orderId: string;
  };
};

export default function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const t = useTranslations('OrderConfirmationPage');

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-primary">{t('title')}</h1>
      <p className="mt-4 text-lg">{t('subtitle')}</p>
      <div className="mt-6 rounded-lg bg-gray-100 p-4">
        <p className="text-text-secondary">{t('orderIdLabel')}</p>
        <p className="text-2xl font-bold text-text-primary">{params.orderId}</p>
      </div>
      <p className="mt-6">{t('thankYou')}</p>
      <div className="mt-8">
        <Link href="/products" className="rounded-md bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90">
          {t('continueShopping')}
        </Link>
      </div>
    </div>
  );
}
