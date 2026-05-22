"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/hooks/useAuth";

export default function CartHydration() {
  const hydrateCart = useCartStore((state) => state.hydrateCart);
   const setUid = useCartStore((state) => state.setUid);
  const user = useAuth();

  useEffect(() => {
    const uid = user?.uid ?? "guest";
    setUid(uid);
    hydrateCart(uid);
  }, [user]);

  return null;
}