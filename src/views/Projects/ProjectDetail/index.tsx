"use client";
import React, { useEffect, useState } from "react";
import { IMAGES } from "@/constants/images";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import { removeSpace } from "@/utils/removeSpace";

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
          <div className="description-wrapper flex flex-col gap-4
                  [&_div]:!text-body11 [&_div]:text-gray-800
                  [&_div>span]:!text-body11 [&_div>span]:text-gray-800 [&_p>span]:!text-body11
                  [&_p]:!text-body11 [&_p]:text-gray-800 [&_p]:text-justify
                  [&_h1]:!text-title1 [&_h1]:text-gray-900
                  [&_h2]:!text-title11 [&_h2]:text-gray-900
                  [&_h3]:!text-title22 [&_h3]:text-gray-900
                  [&_li]:!text-body11 [&_li]:!text-gray-800
                  [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:list-disc [&_ul]:pl-12 [&_ol]:list-decimal [&_ol]:pl-6 
                  [&_table]:w-full [&_table]:block [&_table]:overflow-x-auto [&_table]:text-gray-800 [&_table]:font-medium [&_table_td]:min-w-[100px]
                  [&_div>table]:overflow-x-auto [&_div>table]:block [&_div>table]:w-full
                  [&_strong]:!text-title22 [&_strong]:text-gray-800 [&_strong]:!font-extrabold [&_strong>div]:!font-extrabold
                  [&_blockquote>p]:!text-primary800 [&_blockquote>p]:!text-body11 [&_blockquote>p]:font-semibold [&_blockquote>p]:border-l-[1px] [&_blockquote>p]:border-primary800 [&_blockquote>p]:pl-3
                  [&_blockquote>div]:!text-primary800 [&_blockquote>div]:font-semibold [&_blockquote>div]:border-l-[1px] [&_blockquote>div]:border-primary800 [&_blockquote>div]:pl-3
                  [&_a]:break-all [&_a]:inline [&_a]:hyphens-auto [&_a]:word-wrap-break-word [&_a]:text-primary [&_a]:underline
                  [&_img]:max-w-full [&_img]:h-auto [&_img]:object-contain [&_img]:rounded-xl [&_img]:!mx-auto [&_img]:block
                  [&_figcaption]:text-primary/90 [&_figcaption>div]:text-primary/90 [&_figcaption]:text-base [&_figcaption]:italic [&_figcaption]:mt-3 [&_figcaption]:font-mulish [&_figcaption]:text-center
                  [&_td]:border [&_td]:border-gray800 [&_td]:py-1 [&_td]:px-2 [&_td]:xl:py-2 [&_td]:xl:px-3 [&_td]:text-gray800
                  [&_th]:border [&_th]:border-gray800 [&_th]:py-1 [&_th]:px-2 [&_th]:xl:py-2 [&_th]:xl:px-3 [&_th]:text-gray800
                  [&_hr]:!my-4 [&_hr]:border-gray-400" 
                  dangerouslySetInnerHTML={{ __html: removeSpace(project.summary || "") }} />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
