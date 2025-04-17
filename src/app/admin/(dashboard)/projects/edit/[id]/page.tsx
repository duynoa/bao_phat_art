'use client';
import ProjectForm from '@/viewsAdmin/Projects/ProjectForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/projects/${id}`);
        setProject(response.data.project);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin dự án:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <ProjectForm 
      initialValues={project} 
      isEditing={true} 
    />
  );
};

export default EditProjectPage;
