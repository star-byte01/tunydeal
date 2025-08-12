import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore, CartItem } from './cart';
import { act } from '@testing-library/react';

const sampleItem: Omit<CartItem, 'quantity'> = {
  id: 'variant-1',
  name: 'Test Product',
  price: 100,
  currency: 'TND',
  image: '/test.jpg',
};

describe('useCartStore', () => {
  // Reset the store before each test
  beforeEach(() => {
    act(() => {
      useCartStore.setState({ items: [], isDrawerOpen: false });
    });
  });

  it('should add an item to the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0]).toEqual({ ...sampleItem, quantity: 1 });
  });

  it('should increase quantity if the same item is added again', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem(sampleItem);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove an item from the cart', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().removeItem(sampleItem.id);
    });

    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should update an item quantity', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().updateItemQuantity(sampleItem.id, 5);
    });

    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it('should remove an item if quantity is updated to 0', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().updateItemQuantity(sampleItem.id, 0);
    });

    expect(useCartStore.getState().items.length).toBe(0);
  });

  it('should calculate the total number of items correctly', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, id: 'variant-2' });
      useCartStore.getState().updateItemQuantity(sampleItem.id, 3);
    });

    expect(useCartStore.getState().getTotalItems()).toBe(4);
  });

  it('should calculate the total price correctly', () => {
    act(() => {
      useCartStore.getState().addItem(sampleItem);
      useCartStore.getState().addItem({ ...sampleItem, id: 'variant-2', price: 50 });
      useCartStore.getState().updateItemQuantity(sampleItem.id, 2); // 2 * 100
    });

    // Total should be (2 * 100) + 50 = 250
    expect(useCartStore.getState().getTotalPrice()).toBe(250);
  });

  it('should open and close the drawer', () => {
    expect(useCartStore.getState().isDrawerOpen).toBe(false);

    act(() => {
      useCartStore.getState().openDrawer();
    });
    expect(useCartStore.getState().isDrawerOpen).toBe(true);

    act(() => {
      useCartStore.getState().closeDrawer();
    });
    expect(useCartStore.getState().isDrawerOpen).toBe(false);
  });
});
