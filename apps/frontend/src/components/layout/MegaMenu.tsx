"use client";

import { useState } from 'react';
import { Link } from '@/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Mock data for categories - this should be fetched from a CMS or backend
const categories = [
  {
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Cameras', 'Audio'],
  },
  {
    name: 'Apparel',
    subcategories: ['T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
  },
  {
    name: 'Home & Garden',
    subcategories: ['Furniture', 'Lighting', 'Decor', 'Gardening'],
  },
  {
    name: 'Health & Beauty',
    subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'],
  },
];

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Header');

  const variants = {
    open: { opacity: 1, y: 0, display: 'block' },
    closed: { opacity: 0, y: "-10%", transitionEnd: { display: 'none' } },
  };

  return (
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="cursor-pointer px-4 py-2 text-text-secondary hover:text-primary">
        {t('categories')}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-full origin-top border-t border-border bg-white shadow-lg"
            style={{ marginTop: '0.5rem' }} // Adjust to align with header bottom
          >
            <div className="container mx-auto grid max-w-7xl grid-cols-4 gap-8 px-4 py-8">
              {categories.map((category) => (
                <div key={category.name}>
                  <h3 className="font-bold text-text-primary">{category.name}</h3>
                  <ul className="mt-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={{
                            pathname: '/products',
                            query: {
                              category: category.name.toLowerCase(),
                              subcategory: sub.toLowerCase()
                            },
                          }}
                          className="text-text-secondary hover:text-primary hover:underline"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
