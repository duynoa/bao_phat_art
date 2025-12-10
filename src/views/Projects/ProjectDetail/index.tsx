"use client";
import React, { useEffect, useState } from "react";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";

interface Project {
  _id: string;
  name: string;
  slug?: string;
  address: string;
  completionYear: string;
  type: string;
  summary: string;
  mainImage: string;
}

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/projects?slug=${slug}`);
        setProject(res.data.project);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Không thể tải dự án");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-10 text-center">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 max-w-7xl py-10 text-center text-red-600">
        {error || "Không tìm thấy dự án"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl flex flex-col gap-4">
      <div className="text-title1 font-bold uppercase mt-4 text-gray-900">
        {project.name}
      </div>
      <div className="w-full h-[500px] overflow-hidden rounded-lg mb-6">
        <Image
          src={project.mainImage || IMAGES.gray}
          alt={project.name}
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-600 uppercase">
            Địa chỉ:
          </span>
          <span className="text-base text-gray-800">
            {project.address}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-600 uppercase">
            NĂM HOÀN THÀNH:
          </span>
          <span className="text-base text-gray-800">{project.completionYear}</span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-600 uppercase">
            Loại hình:
          </span>
          <span className="text-base text-gray-800">{project.type}</span>
        </div>
      </div>
      <div>
        <div className="text-title1 font-bold uppercase my-4 text-gray-900">
          Tóm tắt dự án
        </div>
        <div className="text-body1 text-gray-600">
          <div dangerouslySetInnerHTML={{ __html: project.summary }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
