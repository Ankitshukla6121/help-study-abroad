import { create } from "zustand";
import { api } from "../lib/api";

export const useProductsStore = create((set) => ({
  products: [],
  total: 0,
  loading: false,

  fetchProducts: async ({ limit = 10, skip = 0, q = "", category = "" }) => {
    set({ loading: true });

    try {
      let url = `/products?limit=${limit}&skip=${skip}`;

      if (q) url = `/products/search?q=${q}`;
      if (category) url = `/products/category/${category}`;

      const res = await api.get(url);

      set({
        products: res.data.products,
        total: res.data.total,
      });
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      set({ loading: false });
    }
  },
}));
