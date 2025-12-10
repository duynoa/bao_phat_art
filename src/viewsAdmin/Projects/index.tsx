"use client";
import DeleteButton from "@/components/buttons/DeleteButton";
import EditButton from "@/components/buttons/EditButton";
import { Add } from "@mui/icons-material";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";

interface Project {
  _id: string;
  name: string;
  slug?: string;
  address: string;
  completionYear: number;
  type: string;
  mainImage: any;
  summary: string;
}

const ProjectAdmin = () => {
  const router = useRouter();

  const handleEdit = (project: Project) => {
    router.push(`/admin/projects/edit/${project._id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      try {
        await axios.delete(`/api/projects?id=${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Lỗi khi xóa dự án:", error);
      }
    }
  };

  const columns = [
    {
      id: 'image',
      label: 'Hình ảnh',
      minWidth: 170
    },
    {
      id: 'name',
      label: 'Tên dự án',
      minWidth: 170
    },
    {
      id: 'slug',
      label: 'Slug',
      minWidth: 170
    },
    {
      id: 'address',
      label: 'Địa chỉ',
      minWidth: 170
    },
    {
      id: 'completionYear',
      label: 'Năm hoàn thành',
      minWidth: 100,
      align: 'center'
    },
    {
      id: 'projectType',
      label: 'Loại hình',
      minWidth: 130,
    },
    {
      id: 'actions',
      label: 'Thao tác',
      minWidth: 130,
      render: (row: Project) => (
        <div className="flex gap-2">
          <EditButton
            onClick={() => handleEdit(row)}
            className="!p-1.5"
          />
          <DeleteButton
            onClick={() => handleDelete(row._id)}
            className="!p-1.5"
          />
        </div>
      )
    }
  ];

  // Thêm state cho phân trang
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchProjects = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects?page=${page}&limit=${rowsPerPage}`);
      setProjects(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dự án:", error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  React.useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={() => router.push('/admin/projects/add')}
          className="bg-blue-600 hover:bg-blue-700 h-10 normal-case"
          startIcon={<Add />}
        >
          Thêm dự án mới
        </Button>
      </div>

      <Paper className="w-full overflow-hidden">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align as any}
                    style={{ minWidth: column.minWidth }}
                    className="font-semibold bg-gray-50"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Không có dự án nào
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project._id}>
                    <TableCell>
                      <Image
                        width={200}
                        height={100}
                        src={project.mainImage} 
                        alt={project.name}
                        className="w-36 aspect-[3/2] object-cover rounded"
                      />
                    </TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.address}</TableCell>
                    <TableCell>{project.slug}</TableCell>
                    <TableCell align="center">{project.completionYear}</TableCell>
                    <TableCell>
                      {project?.type}
                    </TableCell>
                    <TableCell>
                      {columns.find(col => col.id === 'actions')?.render?.(project)}
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

export default ProjectAdmin;
