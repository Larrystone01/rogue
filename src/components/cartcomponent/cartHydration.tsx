"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishListStore } from "@/store/wishlistStore";
import { useAuth } from "@/hooks/useAuth";

export default function CartHydration() {
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  const setCartUid = useCartStore((state) => state.setCartUid);
  const setUid = useWishListStore((state) => state.setUid);
  const hydrateWishList = useWishListStore((state) => state.hydrateWishList);
  const user = useAuth();

  useEffect(() => {
    const uid = user?.uid ?? "guest";
    setCartUid(uid);
    hydrateCart(uid);
    setUid(uid);
    hydrateWishList(uid);
  }, [user]);

  return null;
}
