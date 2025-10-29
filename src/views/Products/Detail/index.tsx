"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

type Product = {
  _id: string;
  name: string;
  slug: string;
  shortDesc?: string;
  originalPrice: number;
  salePrice?: number;
  discountPercent?: number;
  specifications?: string;
  images: string[];
};

type Props = {
  slug: string;
};

const ProductDetail = ({ slug }: Props) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const images = useMemo(() => {
    const list = (product && product.images && product.images.length) ? product.images : ["/images/banner1.webp"];
    return list;
  }, [product]);
  const discount = useMemo(() => {
    if (!product) return 0;
    if (typeof product.discountPercent === 'number') return Math.round(product.discountPercent);
    if (product.originalPrice && product.salePrice) {
      const pct = ((product.originalPrice - (product.salePrice || 0)) / product.originalPrice) * 100;
      return Math.max(0, Math.round(pct));
    }
    return 0;
  }, [product]);

  useEffect(() => {
    let isMounted = true;
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();
        if (isMounted) setProduct(data.product);
      } catch (e: any) {
        if (isMounted) setError(e.message || "Đã xảy ra lỗi");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return <div className="container mx-auto p-4 min-h-screen">Đang tải sản phẩm...</div>;
  }

  if (error || !product) {
    return <div className="container mx-auto p-4 min-h-screen">{error || "Không tìm thấy sản phẩm"}</div>;
  }

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:text-gray-800">Trang chủ</Link></li>
          <li>/</li>
          <li><Link href="/san-pham" className="hover:text-gray-800">Sản phẩm</Link></li>
          <li>/</li>
          <li className="text-gray-900 line-clamp-1" title={product.name}>{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="aspect-square w-full bg-white rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`${product.name} - hình ${activeIndex + 1}`}
              className="w-full h-full object-cover"
              width={1200}
              height={1200}
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative aspect-square border rounded-lg overflow-hidden ${
                    activeIndex === idx ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`thumb-${idx + 1}`} fill sizes="100px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            {product.shortDesc ? (
              <p className="text-gray-600 leading-relaxed">{product.shortDesc}</p>
            ) : null}
          </div>

          <div className="p-4 rounded-xl border border-gray-200 bg-white flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-gray-900">{(product.salePrice || 0).toLocaleString('vi-VN')}₫</span>
              {product.originalPrice ? (
                <span className="text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
              ) : null}
              {discount > 0 ? (
                <span className="text-xs md:text-sm px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">-{discount}%</span>
              ) : null}
            </div>
            <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
              <span>⭐</span>
              <span className="text-gray-900">4.8</span>
              <span className="text-gray-400">(156)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`tel:0789490590`} className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Gọi ngay: 0789 490 590
            </Link>
            <Link href={`tel:0373464789`} className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors">
              Gọi nhanh: 0373 464 789
            </Link>
          </div>

          {product.specifications ? (
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông số kỹ thuật</h3>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-6">
                {product.specifications}
              </div>
            </div>
          ) : null}

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Liên hệ tư vấn</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                Hotline: <Link href="tel:0789490590" className="text-blue-600 hover:text-blue-700">0789 490 590</Link>
                {" "}-<Link href="tel:0373464789" className="text-blue-600 hover:text-blue-700">0373 464 789</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
