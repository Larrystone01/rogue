"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/fetch";
import type { Product } from "@/lib/fetch";
import Skeleton from "./skeleton";
import CardGrid from "../utils/card";

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
        {loading ? <Skeleton /> : <CardGrid products={products} />}
      </div>
    </section>
  );
}
