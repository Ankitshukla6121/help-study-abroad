import { create } from "zustand";
import { api } from "../lib/api";

export const useUsersStore = create((set) => ({
  users: [],
  total: 0,
  loading: false,

  fetchUsers: async ({ limit = 10, skip = 0, q = "" }) => {
    set({ loading: true });

    try {
      const url = q
        ? `/users/search?q=${q}`
        : `/users?limit=${limit}&skip=${skip}`;

      const res = await api.get(url);

      set({
        users: res.data.users,
        total: res.data.total,
      });
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      set({ loading: false });
    }
  },
}));
