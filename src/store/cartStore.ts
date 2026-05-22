import { create } from "zustand";
import type { ShopProducts } from "@/lib/fetchShop";

export type CartItem = ShopProducts & {
  quantity: number;
  size?: string | null;
};

type CartState = {
  cart: CartItem[];
  uid: string | null;
  setCartUid: (uid: string | null) => void;
  addToCart: (item: CartItem) => void;
  increment: (id: number, size?: string) => void;
  decrement: (id: number, size?: string) => void;
  removeItem: (id: number, size?: string) => void;

  clearCart: (uid: string) => void;
  hydrateCart: (uid: string) => void;

  getTotalPrice: () => number;
  getTotalItems: () => number;
};

const CART_KEY = (uid: string) => `rogue-cart-${uid}`;

export const useCartStore = create<CartState>((set, get) => {
  const saveCart = (cart: CartItem[]) => {
    const uid = get().uid ?? "guest";
    if (typeof window !== "undefined") {
      const cartItems = JSON.stringify(cart);
      localStorage.setItem(CART_KEY(uid), cartItems);
    }
  };

  // const loadCart = (): CartItem[] => {
  //   if (typeof window !== "undefined") {
  //     const storedItem = localStorage.getItem("rogue-cart");
  //     return storedItem ? JSON.parse(storedItem) : [];
  //   }
  //   return [];
  // };

  return {
    cart: [],
    uid: null,
    setCartUid: (uid) => set({ uid }),

    hydrateCart: (uid: string) => {
      if (typeof window === "undefined") return;
      const stored = localStorage.getItem(CART_KEY(uid));
      if (stored) {
        set({ cart: JSON.parse(stored) });
      }
    },
    addToCart: (item) =>
      set((state) => {
        const existingItem = state.cart.find(
          (i) => i.id === item.id && i.size === item.size,
        );
        let newCart: CartItem[];
        if (existingItem) {
          newCart = state.cart.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        } else {
          newCart = [...state.cart, { ...item, quantity: 1 }];
        }
        saveCart(newCart);
        return {
          cart: newCart,
        };
      }),
    increment: (id, size) =>
      set((state) => {
        const newCart = state.cart.map((item) =>
          item.id === id && (item.size ?? undefined) === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        saveCart(newCart);
        return { cart: newCart };
      }),

    decrement: (id, size) =>
      set((state) => {
        const newCart = state.cart
          .map((item) =>
            item.id === id && (item.size ?? undefined) === size
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => item.quantity > 0);
        saveCart(newCart);
        return { cart: newCart };
      }),

    removeItem: (id, size) =>
      set((state) => {
        const newCart = state.cart.filter(
          (item) => !(item.id === id && (item.size ?? undefined) === size),
        );
        saveCart(newCart);
        return { cart: newCart };
      }),

    clearCart: (uid) =>
      set(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem(CART_KEY(uid));
        }
        return { cart: [] };
      }),

    getTotalPrice: () => {
      return get().cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    getTotalItems: () => {
      return get().cart.reduce((total, item) => total + item.quantity, 0);
    },
  };
});
