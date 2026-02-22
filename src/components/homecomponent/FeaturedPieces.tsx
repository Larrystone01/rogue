"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/fetch";
import type { Product } from "@/lib/fetch";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "./skeleton";

export default function FeaturedPieces() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProducts({ limit: 5 });

        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (loading) {
    return <Skeleton />;
  }

  return (
    <section className="md:my-16 my-8">
      <div className="container mx-auto px-6">
        <div className="heading flex justify-between items-center">
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light mb-6">
            Featured Pieces
          </h2>
          <button className="cursor-pointer h-fit border-b font-montserrat tracking-[0.5px] text-[0.75rem] hover:opacity-50 transition-opacity duration-300 ease-in-out">
            View All
          </button>
        </div>
        {loading ? (
          <Skeleton />
        ) : (
          <div className="product-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => {
              return (
                <Link
                  href={""}
                  className="product-card max-w-full sm:max-w-70 flex flex-col"
                  key={product.id}
                >
                  <div className="product-image bg-gray-100 px-3 py-6 w-full flex items-center justify-center mb-4">
                    <div className="relative image h-80 w-60">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="product-details">
                    <div className="title-price flex justify-between">
                      <h3 className="text-[0.8rem] font-normal leading-[1.8]">
                        {product.title}
                      </h3>
                      <p className="text-[0.77rem] text-gray-700">
                        ${product.price}
                      </p>
                    </div>
                    <p className="text-[8px] text-gray-600 uppercase tracking-[1.5px] mt-2">
                      {product.category}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
