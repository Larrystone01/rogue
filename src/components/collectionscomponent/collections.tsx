"use client";
import { createShopFetchStore } from "@/store/useProduct";
import CardGrid from "../utils/card";
import { ShopProducts } from "@/lib/fetchShop";
import { useEffect } from "react";
import Skeleton from "../homecomponent/skeleton";

const useCategoryFetch = createShopFetchStore<ShopProducts>();
export default function Collections() {
  const { products, error, loading, fetchShopProducts } = useCategoryFetch();
  const categoryId = 1;

  useEffect(() => {
    fetchShopProducts({
      url: `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`,
    });
  }, [fetchShopProducts]);
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="collection-container pb-10">
          <div className="header mb-8">
            <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize">
              collections
            </h1>
            <p className="text-[0.9rem] text-gray-500">
              Featured Pieces / Hot Sales
            </p>
          </div>
          {loading ? <Skeleton /> : <CardGrid products={products} />}
        </div>
      </div>
    </section>
  );
}
