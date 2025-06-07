"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "suneditor/dist/css/suneditor.min.css";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import EditButton from '@/components/buttons/EditButton';
import DeleteButton from '@/components/buttons/DeleteButton';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Product } from "@/types/product";

const ProductAdmin = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products?page=${page}&limit=${rowsPerPage}`);
      setProducts(response.data.products || []);
      setTotal(response.data.total || 0);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/edit/${product._id}`);
  };

  const handleAdd = () => {
    router.push("/admin/products/add");
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      try {
        await axios.delete(`/api/products?id=${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        alert('Có lỗi xảy ra khi xóa sản phẩm');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản phẩm</h1>
        <Button
          variant="contained"
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 h-10 normal-case"
          startIcon={<Add />}
        >
          Thêm sản phẩm mới
        </Button>
      </div>

      <Paper className="w-full overflow-hidden">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 170 }}>
                  Hình ảnh
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 170 }}>
                  Tên sản phẩm
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" align="center" style={{ minWidth: 130 }}>
                  Giá (VNĐ)
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" align="center" style={{ minWidth: 130 }}>
                  Giá gốc (VNĐ)
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" align="center" style={{ minWidth: 130 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <div className="flex flex-col items-center py-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400 mb-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <p className="text-lg font-medium">
                        Chưa có sản phẩm nào
                      </p>
                      <p className="text-sm text-gray-400">
                        Bấm &quot;Thêm sản phẩm mới&quot; để bắt đầu
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <TableCell>
                      <div className="relative w-36 aspect-[3/2] rounded overflow-hidden shadow-sm border border-gray-200">
                        <Image
                          fill
                          src={product.images?.[0] || "/placeholder-image.jpg"}
                          alt={product.name}
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="text-sm text-gray-900 font-medium">
                        {product?.salePrice?.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="text-sm text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex gap-2 justify-center">
                        <EditButton
                          onClick={() => handleEdit(product)}
                          className="!p-1.5"
                        />
                        <DeleteButton
                          onClick={() => handleDelete(product._id)}
                          className="!p-1.5"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số dòng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
        />
      </Paper>
    </div>
  );
};

export default ProductAdmin;
