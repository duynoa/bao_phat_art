'use client'
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from 'axios';
import Image from "next/image";

interface ProjectFormProps {
  initialValues?: any;
  isEditing?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialValues,
  isEditing = false,
}) => {
  const [formData, setFormData] = React.useState(initialValues || {});
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  React.useEffect(() => {
    if (initialValues?.mainImage) {
      setImagePreview(initialValues.mainImage);
    }
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name || '');
      formDataToSend.append('address', formData.address || '');
      formDataToSend.append('completionYear', formData.completionYear || '');
      formDataToSend.append('type', formData.type || '');
      formDataToSend.append('summary', formData.summary || '');
      
      if (formData.image) {
        formDataToSend.append('mainImage', formData.image);
      }

      let response;
      if (isEditing) {
        response = await axios.put(`/api/projects/${initialValues._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post('/api/projects', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      console.log(isEditing ? 'Dự án đã được cập nhật:' : 'Dự án đã được tạo:', response.data);
      router.push('/admin/projects');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Lỗi:", error.response?.data?.message || error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Tạo URL xem trước cho hình ảnh
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Chỉnh sửa dự án" : "Thêm dự án mới"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <TextField
                fullWidth
                name="name"
                label="Tên dự án"
                value={formData.name || ''}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Nhập tên dự án..."
                className="rounded-lg"
              />
            </div>

            <div>
              <TextField
                fullWidth
                name="address"
                label="Địa chỉ"
                value={formData.address || ''}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Nhập địa chỉ dự án..."
                className="rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <TextField
                fullWidth
                name="completionYear"
                label="Năm hoàn thành"
                type="number"
                value={formData.completionYear || ''}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Ví dụ: 2024"
                className="rounded-lg"
              />

              <TextField
                fullWidth
                name="type"
                label="Loại hình dự án"
                value={formData.type || ''}
                onChange={handleChange}
                required
                variant="outlined"
                placeholder="Nhập loại hình dự án..."
                className="rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-base mb-2">
              Hình ảnh
            </label>
            <div
              onClick={handleImageClick}
              className="upload-area flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-pointer"
            >
              {imagePreview ? (
                <div className="w-full relative">
                  <Image
                    width={1000}
                    height={1000}
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <span className="text-white">Thay đổi hình ảnh</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl text-blue-500">+</span>
                  </div>
                  <div className="text-gray-700 font-medium">Tải lên hình ảnh dự án</div>
                  <div className="text-gray-500 text-sm mt-1">Kéo thả hoặc click để chọn</div>
                  <div className="text-gray-400 text-xs mt-1">Định dạng: PNG, JPG (Tối đa: 5MB)</div>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium text-base mb-2">
            Tóm tắt dự án
          </label>
          <SunEditor
            setOptions={{
              height: "auto",
              minHeight: "150px",
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                ["bold", "underline", "italic", "strike"],
                ["fontColor", "hiliteColor"],
                ["align", "list", "lineHeight"],
                ["link", "image"],
                ["fullScreen", "showBlocks", "codeView"],
              ],
              defaultStyle: "font-family: 'Inter', sans-serif; font-size: 15px;",
              imageUploadUrl: "/api/upload-image",
              imageAccept: "image/*",
            }}
            setDefaultStyle="font-family: 'Inter', sans-serif; font-size: 15px;"
            setContents={formData.summary || ''}
            onChange={(content) => setFormData(prev => ({ ...prev, summary: content }))}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? "Cập nhật" : "Tạo dự án"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm; 