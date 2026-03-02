"use client";
import { createShopFetchStore } from "@/store/useProduct";
import CardGrid from "../utils/card";
import { ShopProducts } from "@/lib/fetchShop";
import { useEffect } from "react";
import { IoMdWarning } from "react-icons/io";
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
          {loading && <Skeleton />}
          {products?.length === 0 ? (
            <div className="flex flex-col h-96 items-center justify-center">
              <div className="icon text-yellow-500">
                <IoMdWarning size={48} />
              </div>
              <p className="text-[clamp(2.5rem,4vw,4rem)]  text-gray-500 fomt-cormorant text-center">
                There are currently no sales product at the moment kindly check
                back at a later time
              </p>
            </div>
          ) : (
            <CardGrid products={products} />
          )}
        </div>
      </div>
    </section>
  );
}
