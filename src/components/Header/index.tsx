"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Phone, Menu as MenuIcon, Close } from "@mui/icons-material";
import Image from "next/image";
import { IMAGES } from "@/constants/images";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    { href: "/dich-vu", label: "Dịch vụ" },
    // { href: "/san-pham", label: "Sản phẩm" },
    // { href: "/du-an", label: "Dự án" },
    { href: "/lien-he", label: "Liên hệ" },
  ];

  return (
    <div className="sticky top-0 bg-white z-50 border-b border-gray-200 backdrop-blur-md">
      <div className="flex items-center justify-between py-2 container mx-auto max-w-screen-xl px-4">
        <Link href="/" className="size-12 xl:size-16">
          <Image src={IMAGES.logo} alt="logo" width={500} height={500} />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-800 hover:text-gray-600 font-semibold transition-colors text-sm lg:text-base"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="tel: 0789 490 590"
            className="py-2 px-4 rounded-full bg-primary hover:bg-primary/80 text-gray-800 hover:text-white font-bold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-center gap-2">
              <Phone fontSize="small" className="animate-bounce" />
              <p> 0789 490 590</p>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Close /> : <MenuIcon />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[73px] bg-black/50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed inset-x-0 top-[73px] bg-white md:hidden animate-slideDown">
              <div className="flex flex-col py-6 px-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-800 hover:text-gray-600 font-bold transition-all
                              py-3 px-4 rounded-lg hover:bg-gray-100 active:bg-gray-200
                              uppercase text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="tel: 0789 490 590"
                  className="flex items-center gap-2 py-3 px-4 rounded-lg
                            bg-primary text-white font-bold transition-all duration-300
                            hover:bg-gray-700 active:bg-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone fontSize="small" className="animate-bounce" />
                  <p> 0789 490 590</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
