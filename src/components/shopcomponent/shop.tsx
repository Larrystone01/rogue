"use client";
import { useEffect, useState } from "react";
import { createShopFetchStore } from "@/store/useProduct";
import CardGrid from "../utils/card";
import type { ShopProducts } from "@/lib/fetchShop";
import Skeleton from "../homecomponent/skeleton";

const useFetchShop = createShopFetchStore<ShopProducts>();

export default function Shop() {
  const [page, setPage] = useState<number>(1);
  const [lastFetchLength, setLastFetchLength] = useState(0);
  const { products, error, loading, fetchShopProducts } = useFetchShop();
  const limit = 12;
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetchShopProducts({
      url: `https://api.escuelajs.co/api/v1/products`,
      offset: offset,
      limit: limit,
    });
  }, [offset, limit]);

  useEffect(() => {
    setLastFetchLength(products.length);
  }, [products]);

  const handlePrev = () => {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleNext = () => {
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="shop-header mb-12">
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light">
            All Products
          </h1>
          <p className="text-[0.9rem] text-gray-500">
            8 pieces - Spring / Summer 2026
          </p>
        </div>
        {loading ? <Skeleton /> : <CardGrid products={products} />}

        <div className="buttons flex justify-between w-full mt-6 mb-10">
          <button className="capitalize cursor-pointer" onClick={handlePrev}>
            prev
          </button>
          <button
            className="capitalize cursor-pointer"
            onClick={handleNext}
            disabled={lastFetchLength < limit}
          >
            next
          </button>
        </div>
      </div>
    </section>
  );
}
