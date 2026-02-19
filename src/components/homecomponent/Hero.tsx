import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-6">
        <div className="hero-container flex flex-col md:flex-row justify-between">
          <div className="hero-content flex flex-col gap-6 justify-center">
            <p className="uppercase tracking-[3px] text-gray-500 text-[0.75rem]">
              Spring / Summer 2026
            </p>
            <h1 className="hero-title text-[clamp(3.5rem,6vw,6rem)] font-cormorant leading-none max-w-12.5">
              Timeless <em>Essentials</em>
            </h1>
            <p className="max-w-87.5">
              Curated wardrobe foundations in premium natural materials.
              Designed with intention. Built to last beyond seasons.
            </p>
            <div className="buttons flex flex-col md:flex-row gap-3 mb-10 md:mb-0">
              <Link
                href="/shop"
                className="bg-black text-white text-center uppercase py-4 px-10 text-[0.82rem] tracking-[1.5px] font-medium hover:bg-gray-900 transition-colors duration-300"
              >
                shop collection
              </Link>
              <Link
                href="/shop"
                className="bg-transparent text-black text-center uppercase py-4 px-10 border border-gray-300 text-[0.82rem] tracking-[1.5px] font-medium hover:border-gray-900 transition-colors duration-300"
              >
                view collections
              </Link>
            </div>
          </div>
          <div className="hero-image h-screen w-full md:w-1/2 flex items-center justify-center">
            <div className="image relative">
              <Image
                src="/images/hero-image.jpg"
                alt="Hero-Image"
                width={400}
                height={400}
                // fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="black-strip bg-black text-white py-2 px-8 w-full flex flex-wrap items-center justify-center gap-5 md:gap-16">
        <p className="text-[0.65rem] tracking-[2px] uppercase opacity-80 font-normal">
          Free shipping over $200
        </p>
        <p className="text-[0.65rem] tracking-[2px] uppercase opacity-80 font-normal">
          ethically made
        </p>
        <p className="text-[0.65rem] tracking-[2px] uppercase opacity-80 font-normal">
          30-day returns
        </p>
        <p className="text-[0.65rem] tracking-[2px] uppercase opacity-80 font-normal">
          premium materials
        </p>
      </div>
    </section>
  );
}
