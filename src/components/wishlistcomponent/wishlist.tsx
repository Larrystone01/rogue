"use client";

import { useCartStore } from "@/store/cartStore";
import { useWishListStore } from "@/store/wishlistStore";
import { ShopProducts } from "@/lib/fetchShop";
import Image from "next/image";
import { toast } from "react-toastify";

export default function WishListPage() {
  const wishlist = useWishListStore((state) => state.wishlist);
  const removeItem = useWishListStore((state) => state.removeFromWishList);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (item: ShopProducts) => {
    addToCart({ ...item, quantity: 1 });
    // removeFromWishList(item.id);
    toast.success("Item moved to cart!");
  };
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="wishlist-container">
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize text-center">
            Your wishlist ({wishlist.length})
          </h1>
          <div className="wishlist-items-summary flex md:grid md:grid-cols-12 md:flex-row flex-col justify-center gap-20 pt-20">
            <div className="wishlist-items flex flex-col gap-4 col-span-8">
              {wishlist.map((item) => {
                return (
                  <div
                    className="item flex gap-10 p-5 w-full h-fit bg-gray-100"
                    key={`${item.id}`}
                  >
                    <div className="image-container relative w-40 h-40 bg-gray-200 px-5 py-6">
                      <Image
                        src={item.images?.[0] ?? "/images/hero-image.jpg"}
                        // width={72}
                        // height={72}
                        fill
                        alt={item.title}
                        className="object-cover"
                      />
                    </div>
                    <div className="item-details_buttons flex flex-col justify-between w-full">
                      <div className="item-details">
                        <h2 className="text-[25px]">{item.title}</h2>
                      </div>
                      <div className="price_buttons flex justify-between w-full">
                        <div className="price">
                          <h3>${item.price}</h3>
                        </div>
                        <div className="remove-btn_add-to-cart flex gap-3">
                          <button
                            className="cursor-pointer font-bold text-[17px]"
                            onClick={() => {
                              removeItem(item.id);
                              toast.success("Item Removed");
                            }}
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleMoveToCart(item)}
                            className="cursor-pointer bg-black py-2 px-3 text-white rounded-[6px] hover:bg-black/70"
                          >
                            Add to Cart{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
