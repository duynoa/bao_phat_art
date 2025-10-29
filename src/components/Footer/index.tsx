import { IMAGES } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const quickLinks = [
  { text: "Giới thiệu", href: "/gioi-thieu" },
  { text: "Dịch vụ", href: "/dich-vu" },
  { text: "Sản phẩm", href: "/san-pham" },
  { text: "Dự án", href: "/du-an" },
  { text: "Liên hệ", href: "/lien-he" },
];

const contactLinks = [
  { text: "Hotline1:  0789 490 590", href: "tel:0789490590" },
  { text: "Hotline2:  0373 464 789", href: "tel:0373464789" },
  { text: "Email: info@gmail.com", href: "mailto:info@gmail.com" },
];

const Footer = () => {
  return (
    <div className="bg-gray-900">
      <div className="container mx-auto max-w-screen-xl py-16 px-4">
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-20">
          <div className="flex flex-col gap-8 text-gray-300">
            <div className="flex flex-col gap-4">
              <Image
                className="w-20 rounded-lg"
                src={IMAGES.logo2}
                width={500}
                height={500}
                alt="logo"
              />
              <h2 className="text-white font-bold">CTY MTV KIẾN TRÚC XÂY DỰNG BẢO PHÁT</h2>
            </div>
            <label className="font-medium flex flex-col gap-4">
              <h2>Quảng Ngãi, Việt Nam</h2>
              <h2>Mã số doanh nghiệp: ...</h2>
              <h2 className="text-sm">
                Copyright © 2010 CTY MTV kiến trúc xây dựng Bảo Phát
              </h2>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
            <div className="flex flex-col gap-3">
              <span className="text-gray-500">Truy cập nhanh</span>
              {quickLinks.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="text-gray-400 hover:text-white font-bold"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gray-500">Liên hệ</span>
              {contactLinks.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  className="text-gray-400 hover:text-white font-bold"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
