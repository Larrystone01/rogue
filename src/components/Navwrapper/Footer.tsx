import Link from "next/link";
import { shopLinks, companyLinks, supportLinks } from "@/lib/footer-links";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="footer-container flex flex-col gap-y-9 md:grid md:grid-cols-5 py-16">
          <div className="logo-descr col-span-2">
            <div className="logo mb-4">rogue</div>
            <p className="text-[rgba(255,255,255,0.5)] text-[0.88rem] leading-[1.8] max-w-65">
              Timeless wardrobe foundations crafted from the world's finest
              materials.
            </p>
          </div>
          <div className="shop-links md:col-span-1">
            <h3 className="uppercase text-[0.72rem] font-semibold tracking-[2px] mb-6 text-[rgba(255,255,255,0.5)]">
              shop
            </h3>
            <ul className="flex flex-col gap-y-4">
              {shopLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[rgba(255,255,255,0.8)] text-[0.78rem] hover:text-white capitalize transition-colors duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="support-links md:col-span-1">
            <h3 className="uppercase text-[0.72rem] font-semibold tracking-[2px] mb-6 text-[rgba(255,255,255,0.5)]">
              support
            </h3>
            <ul className="flex flex-col gap-y-4">
              {supportLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[rgba(255,255,255,0.8)] text-[0.78rem] mb-3.5 hover:text-white capitalize transition-colors duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="company-links md:col-span-1">
            <h3 className="uppercase text-[0.72rem] font-semibold tracking-[2px] mb-6 text-[rgba(255,255,255,0.5)]">
              company
            </h3>
            <ul className="flex flex-col gap-y-4">
              {companyLinks.map((link) => {
                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[rgba(255,255,255,0.8)] text-[0.78rem] hover:text-white capitalize transition-colors duration-300 mb-3.5"
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="right-reserved border-t border-t-[rgba(255,255,255,0.1)] py-4">
          <p className="text-[0.6rem] text-center text-[rgba(255,255,255,0.5)]">
            &copy; {new Date().getFullYear()} Rogue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
