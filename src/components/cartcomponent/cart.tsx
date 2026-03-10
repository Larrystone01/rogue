"use client";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const hydrateCart = useCartStore((state) => state.hydrateCart);
  useEffect(() => {
    hydrateCart();
  }, [hydrateCart]);

  const totalPrice = getTotalPrice();

  if (cart.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <p>
          You Do not have anything in your cart, kindly add a product to your
          cart{" "}
          <Link href="/shop" className="text-blue-600">
            here
          </Link>
        </p>
      </div>
    );
  }
  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        <div className="cart-container">
          <h1 className="text-[clamp(2.5rem,4vw,4rem)] font-cormorant font-light capitalize text-center">
            Shopping Cart
          </h1>
          <div className="cart-items-summary flex md:flex-row flex-col justify-center gap-20 pt-20">
            <div className="cart-items flex flex-col gap-10">
              {cart.map((item) => {
                return (
                  <div className="item flex gap-10 w-fit" key={item.id}>
                    <div className="image-container relative flex items-center justify-center w-50 h-50 bg-gray-200 px-5 py-6">
                      <Image
                        src={item.images?.[0] ?? "/images/hero-image.jpg"}
                        width={100}
                        height={100}
                        alt={item.title}
                        className="object-contain"
                      />
                    </div>
                    <div className="item-details flex flex-col space-y-10 w-full text-[20px]">
                      <h2 className="text-[25px]">{item.title}</h2>
                      <div className="size-qty-price flex justify-between w-full text-gray-500">
                        <p>
                          Size:M <span>Quantity: {item.quantity}</span>
                        </p>
                        <h3 className="text-[30px] font-bold">
                          ${item.price * item.quantity}
                        </h3>
                      </div>
                      <div className="total-price_rmv-btn flex justify-between text-gray-500">
                        <h3 className="">${item.price} each</h3>
                        <button
                          className="underline cursor-pointer"
                          onClick={() => removeItem(item.id, item.size)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="summary bg-gray-100 p-10 w-full md:w-100">
              <h3 className="text-center text-[30px] font-bold">
                Order Summary
              </h3>
              <div className="sub-total capitalize flex justify-between mt-8 text-[1.1rem]">
                <p>subtotal</p>
                <p className="font-semibold">${totalPrice}</p>
              </div>
              <div className="shipping capitalize flex justify-between mt-5 border-b border-b-gray-300 pb-10">
                <p>shipping</p>
                <p className="font-semibold">free</p>
              </div>
              <div className="total flex justify-between items-center text-[1.8rem] pt-8 pb-10">
                <p className="font-bold">Total</p>
                <p>${totalPrice}</p>
              </div>
              <button className="check-out-btn uppercase bg-black w-full text-white py-3 text-[0.85rem]">
                proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
