"use client";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const decrement = useCartStore((state) => state.decrement);
  const increment = useCartStore((state) => state.increment);
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
          <div className="cart-items-summary flex md:grid md:grid-cols-12 md:flex-row flex-col justify-center gap-20 pt-20">
            <div className="cart-items flex flex-col gap-4 col-span-8">
              {cart.map((item) => {
                return (
                  <div
                    className="item flex flex-col gap-10 p-5 w-full h-fit bg-gray-100"
                    key={`${item.id}-${item.size}`}
                  >
                    <div className="top-level-image-details flex space-x-5">
                      <div className="image-container relative flex items-center justify-center w-20 h-20 bg-gray-200 px-5 py-6">
                        <Image
                          src={item.images?.[0] ?? "/images/hero-image.jpg"}
                          // width={72}
                          // height={72}
                          fill
                          alt={item.title}
                          className="object-cover"
                        />
                      </div>
                      <div className="details-price flex flex-col md:flex-row md:justify-between w-full space-y-4 md:space-y-0">
                        <div className="item-details flex flex-col md:space-y-10 w-full text-[20px]">
                          <h2 className="md:text-[25px] mb-0 leading-[1.1]">
                            {item.title}
                          </h2>
                          {item.size && (
                            <div className="size-qty-price flex justify-between w-full text-gray-500">
                              <p>
                                <span className="uppercase">
                                  Size: {item.size}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="total-price flex justify-between text-gray-500">
                          <h3 className="md:text-[30px] text-[18px] font-bold">
                            ${item.price * item.quantity}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="remove-btn w-full flex justify-between">
                      <button
                        className="cursor-pointer flex gap-1 items-center"
                        onClick={() => {
                          removeItem(item.id, item.size ?? undefined);
                          toast.success("Item Removed");
                        }}
                      >
                        <FaTrash />
                        <span>Remove</span>
                      </button>
                      <div className="button">
                        <div className="qty-btn flex items-center space-x-6">
                          <button
                            onClick={() =>
                              decrement(item.id, item.size ?? undefined)
                            }
                            className={`uppercase border border-gray-300 text-[1.2rem] size-8 cursor-pointer hover:border-black`}
                            // disabled={quantity === 0}
                          >
                            -
                          </button>
                          <p>{item.quantity}</p>

                          <button
                            onClick={() =>
                              increment(item.id, item.size ?? undefined)
                            }
                            className={`uppercase border border-gray-300 text-[1.2rem] size-8 cursor-pointer hover:border-black`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="summary bg-gray-100 p-10 w-full col-span-4">
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
