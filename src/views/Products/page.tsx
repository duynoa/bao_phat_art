"use client";
import Card from "@/components/Card";
import { Pagination } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        if (data.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
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

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
            {loading ? (
              <div>Đang tải...</div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product._id}
                  title={product.name}
                  description={product.shortDesc}
                  image={product.images[0]}
                  href={`/san-pham/${product.slug}`}
                />
              ))
            ) : (
              <div>Không có sản phẩm nào</div>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination count={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
