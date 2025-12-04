// store/useUsersStore.js
"use client";
import { create } from "zustand";

export const useUsersStore = create((set) => ({
  users: [],
  total: 0,
  loading: false,
  fetchUsers: async ({ limit = 10, skip = 0, q = "" }) => {
    set({ loading: true });
    let url = `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
    if (q) url = `https://dummyjson.com/users/search?q=${q}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      set({ users: data.users, total: data.total, loading: false });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
}));
