import { create } from "zustand";
import { ShopProducts } from "@/lib/fetchShop";

type ShopFetch<T> = {
  products: T[];
  loading: boolean;
  error: string | null;
  fetchShopProducts: (params: {
    url: string;
    offset?: number;
    limit?: number;
  }) => Promise<void>;
};

export const createShopFetchStore = <T>() =>
  create<ShopFetch<T>>((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchShopProducts: async ({ url, offset, limit }) => {
      set({ loading: true, error: null });
      try {
        const params = new URLSearchParams();

        if (offset !== undefined) params.append("offset", String(offset));
        if (limit !== undefined) params.append("limit", String(limit));

        const fullUrl = params.toString() ? `${url}?${params.toString()}` : url;
        const res = await fetch(fullUrl);
        if (!res.ok) throw new Error("Failed to fetch");
        const data: T[] = await res.json();

        set({ products: data, loading: false });
        console.log(data);
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Unknown error",
          loading: false,
        });
      }
    },
  }));
