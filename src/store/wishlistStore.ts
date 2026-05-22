import { create } from "zustand";
import { ShopProducts } from "@/lib/fetchShop";

type WishListState = {
  wishlist: ShopProducts[];
  uid: string | null;
  setUid: (uid: string | null) => void;
  addToWishList: (item: ShopProducts) => void;
  removeFromWishList: (id: number) => void;
  isWishListed: (id: number) => boolean;
  hydrateWishList: (uid: string) => void;
  clearWishList: (uid: string) => void;
};

const WISHLIST_KEY = (uid: string) => `rogue-wishlist-${uid}`;

export const useWishListStore = create<WishListState>((set, get) => {
  const saveWishList = (wishList: ShopProducts[]) => {
    const uid = get().uid ?? "guest";
    if (typeof window != "undefined") {
      localStorage.setItem(WISHLIST_KEY(uid), JSON.stringify(wishList));
    }
  };

  return {
    wishlist: [],
    uid: null,
    setUid: (uid) => set({ uid }),

    hydrateWishList: (uid) => {
      if (typeof window === "undefined") return;
      const stored = localStorage.getItem(WISHLIST_KEY(uid));
      set({ wishlist: stored ? JSON.parse(stored) : [] });
    },

    addToWishList: (item) => {
      set((state) => {
        const exists = state.wishlist.find((i) => i.id === item.id);
        if (exists) return state;
        const newWishList = [...state.wishlist, item];
        saveWishList(newWishList);
        return { wishlist: newWishList };
      });
    },

    removeFromWishList: (id) => {
      set((state) => {
        const newWishList = state.wishlist.filter((i) => i.id !== id);
        saveWishList(newWishList);
        return { wishlist: newWishList };
      });
    },

    isWishListed: (id: number) => get().wishlist.some((i) => i.id === id),

    clearWishList: (uid) => {
      set(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(WISHLIST_KEY(uid));
        }
        return { wishlist: [] };
      });
    },
  };
});
