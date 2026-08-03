"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
const CartContext = createContext(null);

const STORAGE_KEY = "ink3d_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const hydrated = useRef(false);

  // Load cart from localStorage once, on mount, so it survives a page refresh.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage:", err);
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Persist cart to localStorage on every change (after initial hydration,
  // so we don't overwrite saved data with the initial empty array).
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [items]);

  function addItem(product) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setOpen(true);
  }
  function removeItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }
  function updateQty(id, qty) {
    if (qty < 1) return removeItem(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }
  function clearCart() {
    setItems([]);
  }
  const total = items.reduce((sum, i) => sum + parseFloat(i.price.replace('$','')) * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, total, count, open, setOpen, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) return { items: [], addItem: () => {}, removeItem: () => {}, updateQty: () => {}, total: 0, count: 0, open: false, setOpen: () => {}, clearCart: () => {} };
  return ctx;
}
