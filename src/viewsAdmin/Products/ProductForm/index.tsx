"use client";
import { AddCircleOutline } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import { Button, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FormData {
  name: string;
  salePrice: number;
  originalPrice: number;
  images: string[];
  shortDesc: string;
  specifications: string;
}

interface FormErrors {
  name?: string;
  salePrice?: string;
  originalPrice?: string;
  images?: string;
  shortDesc?: string;
  specifications?: string;
}

interface ProductFormProps {
  initialValues?: any;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialValues,
  isEditing,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    salePrice: 0,
    originalPrice: 0,
    images: [],
    shortDesc: "",
    specifications: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange =
    (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name) newErrors.name = "Vui lòng nhập tên sản phẩm";
    // if (!formData.price) newErrors.price = "Vui lòng nhập giá bán";
    // if (!formData.originalPrice)
    //   newErrors.originalPrice = "Vui lòng nhập giá gốc";
    // if (!formData.images.length)
    //   newErrors.images = "Vui lòng tải lên ít nhất 1 hình ảnh";
    if (!formData.shortDesc)
      newErrors.shortDesc = "Vui lòng nhập mô tả sản phẩm";
    if (!formData.specifications)
      newErrors.specifications = "Vui lòng nhập thông số kỹ thuật";

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("shortDesc", formData.shortDesc);
        formDataToSend.append("originalPrice", formData.originalPrice.toString());
        formDataToSend.append("salePrice", formData.salePrice.toString());

        const discountPercent = ((formData.originalPrice - formData.salePrice) / formData.originalPrice) * 100;
        formDataToSend.append("discountPercent", discountPercent.toString());
        formDataToSend.append("specifications", formData.specifications);

        for (const imageBase64 of formData.images) {
          if (imageBase64.startsWith('data:image')) {
            const response = await fetch(imageBase64);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: "image/jpeg" });
            formDataToSend.append("images", file);
          } else {
            formDataToSend.append("existingImages", imageBase64);
          }
        }

        const url = isEditing ? `/api/products/${initialValues._id}` : "/api/products";
        const method = isEditing ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          body: formDataToSend,
        });

        if (!response.ok) {
          throw new Error(isEditing ? "Lỗi khi cập nhật sản phẩm" : "Lỗi khi thêm sản phẩm");
        }

        const result = await response.json();
        console.log(isEditing ? "Sản phẩm đã được cập nhật:" : "Sản phẩm đã được thêm:", result);
        router.push("/admin/products");
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter((file) => {
      const isValidType = ["image/jpeg", "image/png"].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) {
      setErrors((prev) => ({
        ...prev,
        images: "File không hợp lệ. Chỉ chấp nhận PNG, JPG dưới 5MB",
      }));
      return;
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </h2>
      </div>

      <div className="space-y-8 bg-white p-6 rounded-xl shadow-md">
        <div className="mt-6 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="file"
                accept="image/png, image/jpeg"
                multiple
                className="hidden"
                id="image-upload"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-upload">
                <div className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                  <AddCircleOutline className="text-5xl text-blue-600 mb-2" />
                  <Typography className="text-base text-gray-900">
                    Tải lên hình ảnh sản phẩm
                  </Typography>
                  <Typography className="text-sm text-gray-600">
                    Kéo thả hoặc click để chọn
                  </Typography>
                  <Typography className="text-xs text-gray-500">
                    Định dạng: PNG, JPG (Tối đa: 5MB)
                  </Typography>
                  {errors.images && (
                    <Typography className="text-xs text-red-500">
                      {errors.images}
                    </Typography>
                  )}
                </div>
              </label>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        width={100}
                        height={100}
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-40 object-cover rounded"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ClearIcon fontSize="small" className="w-4 h-4"/>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div className="space-y-6">
                <TextField
                  label="Tên sản phẩm"
                  fullWidth
                  value={formData.name}
                  onChange={handleChange("name")}
                  error={!!errors.name}
                  helperText={errors.name}
                  placeholder="Nhập tên sản phẩm..."
                />

                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="Giá bán (VNĐ)"
                    fullWidth
                    type="text"
                    value={formData.salePrice.toLocaleString('vi-VN')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setFormData(prev => ({
                        ...prev,
                        salePrice: parseInt(value) || 0
                      }));
                    }}
                    error={!!errors.salePrice}
                    helperText={errors.salePrice}
                    placeholder="Nhập giá bán..."
                  />
                  <TextField
                    label="Giá gốc (VNĐ)" 
                    fullWidth
                    type="text"
                    value={formData.originalPrice.toLocaleString('vi-VN')}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d]/g, '');
                      setFormData(prev => ({
                        ...prev,
                        originalPrice: parseInt(value) || 0
                      }));
                    }}
                    error={!!errors.originalPrice}
                    helperText={errors.originalPrice}
                    placeholder="Nhập giá gốc..."
                  />
                </div>
              </div>
            </div>
          </div>

          <TextField
            label="Mô tả sản phẩm"
            fullWidth
            value={formData.shortDesc}
            onChange={handleChange("shortDesc")}
            error={!!errors.shortDesc}
            helperText={errors.shortDesc}
            multiline
            rows={4}
          />

          <TextField
            label="Thông số kỹ thuật"
            fullWidth
            value={formData.specifications}
            onChange={handleChange("specifications")}
            error={!!errors.specifications}
            helperText={errors.specifications}
            multiline
            rows={4}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outlined"
            onClick={() => router.push("/admin/products")}
          >
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEditing ? "Cập nhật" : "Thêm sản phẩm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
