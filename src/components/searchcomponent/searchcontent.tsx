"use client";
import { FcSearch } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { createShopFetchStore } from "@/store/useProduct";
import { ShopProducts } from "@/lib/fetchShop";
import CardGrid from "../utils/card";
import Skeleton from "../homecomponent/skeleton";

const useFetch = createShopFetchStore<ShopProducts>();
export default function SearchContent() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const latestQuery = useRef("");
  const { loading, error, products, fetchShopProducts, clearProducts } =
    useFetch();
  const query = searchQuery.trim();
  useEffect(() => {
    if (!query) {
      clearProducts();
      return;
    }

    const delay = setTimeout(() => {
      fetchShopProducts({
        url: `https://api.escuelajs.co/api/v1/products/?title=${query}`,
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);
  return (
    <section>
      <div className="container mx-auto px-6">
        <div className="content-container">
          <div className="search-input-side flex flex-col items-center space-y-6 mb-6">
            <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize">
              search
            </h1>
            <p className="text-[0.9rem] text-gray-500">
              Discover your perfect piece from our curated collection{" "}
            </p>
            <div className="relative search-bar w-full md:w-150">
              <div className="icon absolute left-3 top-1/2 -translate-y-1/2">
                <FcSearch />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                name="search-bar"
                placeholder="Try 'cap', 'clothes', 'phone'..."
                id="search-bar"
                className="h-full outline-none w-full py-2 px-10 placeholder:text-gray-400 placeholder:text-center font-montserrat border-gray-300 border-2 focus:border-black transition-colors duration-300 ease-in-out"
              />
              {query && query !== "" && (
                <button
                  className="icon absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    clearProducts();
                  }}
                >
                  <MdCancel />
                </button>
              )}
            </div>
          </div>
          <div className="result-side flex items-center justify-center w-full mb-10">
            {!query ? (
              <div className="empty-search border border-dotted w-3xl h-96 flex flex-col space-y-10 items-center justify-center rounded-4xl">
                <div className="icon">
                  <FcSearch size={48} />
                </div>
                <p className="text-[0.7rem] text-gray-500">
                  Start typing to browse our collection
                </p>
              </div>
            ) : loading ? (
              <Skeleton />
            ) : products && products.length === 0 ? (
              <div className="not-found text-center flex items-center justify-center h-96">
                <p>
                  OOPs!!! We could not find what you're looking for, try making
                  another search
                </p>
              </div>
            ) : products && products.length > 0 ? (
              <div className="search-result w-full">
                <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize mb-6">
                  Search Result
                </h2>
                <CardGrid products={products} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
