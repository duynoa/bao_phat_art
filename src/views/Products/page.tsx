"use client";
import Card from "@/components/Card";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

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

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get("/api/products");
        
        if (data && data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]);
          console.warn("Dữ liệu sản phẩm không đúng định dạng:", data);
        }
      } catch (error: any) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        setError(error.response?.data?.message || "Không thể tải danh sách sản phẩm");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-8 px-4 xl:px-0">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-3">
          <Sidebar />
        </div>

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="text-gray-600 flex flex-col sm:flex-row sm:items-center gap-4">
                <h4 className="font-medium">Xếp theo:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <span className="text-gray-600 flex items-center">
                    <input type="radio" className="mr-2 w-5 h-5" />
                    Tên A - Z
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <input type="radio" className="mr-2 w-5 h-5" />
                    Tên Z - A
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <input type="radio" className="mr-2 w-5 h-5" />
                    Giá thấp đến cao
                  </span>
                  <span className="text-gray-600 flex items-center">
                    <input type="radio" className="mr-2 w-5 h-5" />
                    Giá cao đến thấp
                  </span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Lỗi:</p>
              <p>{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
            {loading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                  <p className="text-gray-600">Đang tải sản phẩm...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product._id}
                  title={product.name}
                  description={product.shortDesc}
                  image={product.images && product.images.length > 0 ? product.images[0] : undefined}
                  href={`/san-pham/${product.slug}`}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">Không có sản phẩm nào</p>
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="flex justify-center mt-8">
              <Pagination count={10} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
