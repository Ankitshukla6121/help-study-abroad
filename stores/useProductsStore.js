// store/useProductsStore.js
"use client";
import { create } from "zustand";

export const useProductsStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,
  categories: [],
  fetchProducts: async ({ limit = 10, skip = 0, q = "", category = "" }) => {
    set({ loading: true });
    try {
      let url = category
        ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
        : q
        ? `https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

      const res = await fetch(url);
      const data = await res.json();
      set({ products: data.products || [], total: data.total || 0, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
  fetchCategories: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      set({ categories: data });
    } catch (err) {
      console.error(err);
    }
  },
}));
