"use client";
import React, { useEffect, useState } from "react";
import CardProject from "./CardProject";
import { Pagination } from "@mui/material";
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

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 8;

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`/api/projects?page=${page}&limit=${limit}`);
      setProjects(response.data.data);
      setTotal(Math.ceil(response.data.total / limit));
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dự án:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
  };

  return (
    <div className="container py-10 flex flex-col gap-6 px-4 xl:px-0">
      <h1 className="text-title1 font-bold uppercase text-center text-gray-900">
        Dự án tiêu biểu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <CardProject key={project._id} project={project} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination 
          count={total} 
          page={page + 1} 
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Projects;
