"use client";
import { Menu, X, ShoppingCart } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleHamburgerClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="fixed w-screen z-50 bg-white/90 backdrop-blur-sm">
      <div className="nav-container container mx-auto px-6">
        <nav className="navbar flex items-center justify-between py-4">
          <div className="hamburger-cart md:hidden">
            <button
              className="hamburger-menu cursor-pointer"
              onClick={handleHamburgerClick}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
          <div className="logo md:flex-1">
            <Link href="/" className="logo">
              Rogue
            </Link>
          </div>
          <div
            className={`nav-links-functionality absolute border-b md:border-b-0 border-b-[#888] md:static w-full top-full left-0 px-6 flex flex-col md:flex-row flex-2 justify-between -z-50 md:z-0 transition-all ease-in-out duration-300 md:opacity-100 md:translate-y-0 bg-white md:bg-inherit ${isOpen ? "translate-y-0 opacity-100" : "opacity-0 -translate-y-full"}`}
          >
            <div className="nav-links flex flex-col md:flex-row gap-4 md:gap-10 md:w-1/2 md:justify-center md:items-center">
              <Link
                className="border-b border-b-[#888] md:border-none pb-3"
                href="/shop"
              >
                Shop
              </Link>
              <Link
                className="border-b border-b-[#888] md:border-none pb-3"
                href="/collections"
              >
                Collections
              </Link>
              <Link
                className="border-b border-b-[#888] md:border-none pb-3"
                href="/about"
              >
                About
              </Link>
            </div>
            <div className="functionality flex gap-4 md:gap-10 md:w-1/2 md:justify-end justify-center py-5 md:p-0">
              <div className="search">
                <Link href="/search" className="">
                  Search
                </Link>
              </div>
              <div className="cart">
                <Link href="/cart" className="">
                  Cart
                </Link>
              </div>
              <div className="sign-in">
                <Link href="/sign-in" className="">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
          <div className="sign-up-icon flex gap-4 md:hidden">
            <Link href="/login">
              {" "}
              <CgProfile size={24} />{" "}
            </Link>
            <Link href="/cart">
              <ShoppingCart />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
