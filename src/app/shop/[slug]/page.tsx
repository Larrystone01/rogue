"use client";
import Navwrapper from "@/components/Navwrapper/NavFooter";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShopProducts } from "@/lib/fetchShop";
import { TbTruckDelivery } from "react-icons/tb";
import { TbArrowBack } from "react-icons/tb";
import { GiAutoRepair } from "react-icons/gi";
import { CiRedo } from "react-icons/ci";

// type ProductPageProps = {
//   params: { slug: string };
// };

export default function ProductPage() {
  const [product, setProduct] = useState<ShopProducts | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState<string>("m");
  const [qty, setQty] = useState<number>(0);
  const params = useParams();
  const pathname = usePathname();
  const firstPath = pathname.split("/").filter(Boolean).shift();
  console.log(firstPath);
  const slug = params.slug as string;
  const id = slug.split("-").pop();

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length) {
      setCurrentImage(product.images[0]);
    }
  }, [product]);

  if (!product || !currentImage) return <div>Loading...</div>;
  return (
    <Navwrapper>
      <section>
        <div className="container mx-auto px-6">
          <div className="product-container flex flex-col md:flex-row items-start h-fit gap-10 mb-5">
            <div className="image-side w-full md:w-1/2 md:sticky self-start top-0">
              <div className="image-content flex items-center justify-center bg-gray-100">
                <div className="image-container relative w-80 h-[80vh]">
                  <Image
                    src={currentImage}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="thumbnail-container grid grid-cols-3 mt-4 gap-4">
                {product.images?.map((image) => {
                  return (
                    <button
                      key={image}
                      className="thumb-parent relative bg-gray-100 flex w-full h-30.25 md:h-57.5 items-center justify-center py-2 cursor-pointer"
                      onClick={() => setCurrentImage(image)}
                    >
                      <div
                        className={`overlay absolute inset-0 z-30 ${image === currentImage ? "bg-gray-200/0 border border-black" : "bg-gray-200/50"} hover:bg-gray-200/0 transition-opacity ease-in duration-200`}
                      ></div>
                      <div className="thumbnail relative md:size-35 size-20">
                        <Image
                          src={image}
                          alt={image}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="details-side w-full md:w-1/2 max-h-fit">
              <div className="top-side">
                <div className="bread-crumb text-gray-500 text-[0.8rem] mb-8">
                  <Link href="/shop">Shop</Link> /{" "}
                  <span>{product.category?.name}</span>
                </div>
                <h2 className="font-cormorant text-[clamp(2rem,3vw,2.8rem)] font-light leading-[1.1] mb-[0.8rem]">
                  {product.title}
                </h2>
                <p className="text-[1.4rem] text-gray-700 mb-8">
                  ${product.price}
                </p>
                <p className="text-gray-700 leading-[1.9] text-[0.85rem] mb-10">
                  {product.description}
                </p>
              </div>
              <div className="line-break h-px bg-gray-300 my-8"></div>
              <div className="bottom-side">
                <div className="size mb-8">
                  <h3 className="uppercase font-semibold text-[0.8rem] tracking-[1.5px] mb-4">
                    size
                  </h3>
                  <div className="size-grid flex gap-3 flex-wrap">
                    {["xs", "s", "m", "l", "xl"].map((size) => {
                      return (
                        <button
                          key={size}
                          onClick={() => setCurrentSize(size)}
                          className={`uppercase border border-gray-300 text-[0.82rem] size-13 cursor-pointer hover:border-black ${size === currentSize ? "bg-black text-white border-black" : ""}`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="quantity mb-8">
                  <h3 className="uppercase font-semibold text-[0.8rem] tracking-[1.5px] mb-4">
                    quantity
                  </h3>
                  <div className="qty-btn flex items-center space-x-6">
                    <button
                      onClick={() => setQty((cur) => cur + 1)}
                      className={`uppercase border border-gray-300 text-[1.2rem] size-10 cursor-pointer hover:border-black`}
                    >
                      +
                    </button>
                    <p>{qty}</p>
                    <button
                      onClick={() => setQty((cur) => cur - 1)}
                      className={`uppercase border border-gray-300 text-[1.2rem] size-10 cursor-pointer hover:border-black`}
                      disabled={qty === 0}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="add-cart">
                  <button className="uppercase cursor-pointer bg-black text-white text-[0.85rem] w-full p-[1.1rem] border-[1.5px] border-black font-medium tracking-[1.5px] mb-4 hover:bg-gray-900">
                    add to cart
                  </button>
                  <button className="uppercase cursor-pointer bg-transparent text-black text-[0.85rem] w-full p-[1.1rem] border-[1.5px] border-gray-300 font-normal tracking-[1px] mb-4 hover:bg-black">
                    save to wishlist
                  </button>
                </div>
                <div className="perks mt-10 border-t border-t-gray-100">
                  <div className="perk flex gap-5 py-5 border-b border-b-gray-100">
                    <div className="icon">
                      <TbTruckDelivery size={20} />
                    </div>
                    <div className="detaiils">
                      <h4 className="text-[0.88rem] mb-[0.2rem] capitalize">
                        free shipping
                      </h4>
                      <p className="text-gray-500 text-[0.82rem] capitalize">
                        on all orders over $200
                      </p>
                    </div>
                  </div>
                  <div className="perk flex gap-5 py-5 border-b border-b-gray-100">
                    <div className="icon">
                      <TbArrowBack size={20} />
                    </div>
                    <div className="detaiils">
                      <h4 className="text-[0.88rem] mb-[0.2rem] capitalize">
                        free returns
                      </h4>
                      <p className="text-gray-500 text-[0.82rem] capitalize">
                        within 30 days of purchase
                      </p>
                    </div>
                  </div>
                  <div className="perk flex gap-5 py-5 border-b border-b-gray-100">
                    <div className="icon">
                      <GiAutoRepair size={20} />
                    </div>
                    <div className="detaiils">
                      <h4 className="text-[0.88rem] mb-[0.2rem] capitalize">
                        lifetime repairs
                      </h4>
                      <p className="text-gray-500 text-[0.82rem] capitalize">
                        we stand behind every piece
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Navwrapper>
  );
}
