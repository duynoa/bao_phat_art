"use client";
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TablePagination, 
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import { 
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon
} from "@mui/icons-material";

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
};

const ContactAdmin = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
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

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/contact?status=${statusFilter === 'all' ? '' : statusFilter}`);
      setContacts(response.data.contacts || []);
      setTotal(response.data.contacts?.length || 0);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu liên hệ:', error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleViewDetail = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
    // Đánh dấu là đã đọc nếu chưa đọc
    if (contact.status === 'pending') {
      handleUpdateStatus(contact._id, 'read');
    }
  };

  const handleUpdateStatus = async (id: string, status: 'pending' | 'read' | 'replied') => {
    try {
      await axios.put(`/api/contact/${id}`, { status });
      fetchContacts();
      if (selectedContact && selectedContact._id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này không?')) {
      try {
        await axios.delete(`/api/contact/${id}`);
        fetchContacts();
        if (selectedContact && selectedContact._id === id) {
          setDialogOpen(false);
          setSelectedContact(null);
        }
      } catch (error) {
        console.error('Lỗi khi xóa liên hệ:', error);
        alert('Có lỗi xảy ra khi xóa liên hệ');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'read':
        return 'info';
      case 'replied':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'read':
        return 'Đã đọc';
      case 'replied':
        return 'Đã trả lời';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col gap-4">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Liên hệ</h1>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Lọc theo trạng thái</InputLabel>
          <Select
            value={statusFilter}
            label="Lọc theo trạng thái"
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="all">Tất cả</MenuItem>
            <MenuItem value="pending">Chờ xử lý</MenuItem>
            <MenuItem value="read">Đã đọc</MenuItem>
            <MenuItem value="replied">Đã trả lời</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Paper className="w-full overflow-hidden">
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 150 }}>
                  Tên người liên hệ
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 180 }}>
                  Email
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 130 }}>
                  Số điện thoại
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 200 }}>
                  Nội dung
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" align="center" style={{ minWidth: 130 }}>
                  Trạng thái
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" style={{ minWidth: 150 }}>
                  Ngày gửi
                </TableCell>
                <TableCell className="font-semibold bg-gray-50" align="center" style={{ minWidth: 100 }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
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
                        Chưa có liên hệ nào
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact) => (
                  <TableRow 
                    key={contact._id} 
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      contact.status === 'pending' ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <TableCell>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-700">
                        {contact.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-700">
                        {contact.phone}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-700 line-clamp-2 max-w-xs">
                        {contact.message}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={getStatusLabel(contact.status)}
                        color={getStatusColor(contact.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDate(contact.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetail(contact)}
                        startIcon={<VisibilityIcon />}
                        className="normal-case"
                      >
                        Xem
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
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

      {/* Dialog chi tiết liên hệ */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          <span>Chi tiết liên hệ</span>
          <IconButton onClick={() => setDialogOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedContact && (
            <div className="space-y-4 mt-2">
              <Box className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <LocationIcon className="text-gray-600 mt-1" />
                <div>
                  <Typography variant="subtitle2" className="text-gray-500 mb-1">
                    Tên người liên hệ
                  </Typography>
                  <Typography variant="body1" className="font-medium">
                    {selectedContact.name}
                  </Typography>
                </div>
              </Box>

              <Box className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <EmailIcon className="text-gray-600 mt-1" />
                <div>
                  <Typography variant="subtitle2" className="text-gray-500 mb-1">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    <a 
                      href={`mailto:${selectedContact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </Typography>
                </div>
              </Box>

              <Box className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <PhoneIcon className="text-gray-600 mt-1" />
                <div>
                  <Typography variant="subtitle2" className="text-gray-500 mb-1">
                    Số điện thoại
                  </Typography>
                  <Typography variant="body1">
                    <a 
                      href={`tel:${selectedContact.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </Typography>
                </div>
              </Box>

              <Box className="p-3 bg-gray-50 rounded-lg">
                <Typography variant="subtitle2" className="text-gray-500 mb-2">
                  Nội dung tin nhắn
                </Typography>
                <Typography variant="body1" className="whitespace-pre-wrap">
                  {selectedContact.message}
                </Typography>
              </Box>

              <Box className="flex items-center gap-2">
                <Typography variant="subtitle2" className="text-gray-500">
                  Trạng thái:
                </Typography>
                <Chip
                  label={getStatusLabel(selectedContact.status)}
                  color={getStatusColor(selectedContact.status) as any}
                  size="small"
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  Ngày gửi
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  {formatDate(selectedContact.createdAt)}
                </Typography>
              </Box>
            </div>
          )}
        </DialogContent>
        <DialogActions className="px-6 py-4">
          <FormControl size="small" sx={{ minWidth: 150, mr: 'auto' }}>
            <InputLabel>Thay đổi trạng thái</InputLabel>
            <Select
              value={selectedContact?.status || 'pending'}
              label="Thay đổi trạng thái"
              onChange={(e) => {
                if (selectedContact) {
                  handleUpdateStatus(selectedContact._id, e.target.value as 'pending' | 'read' | 'replied');
                }
              }}
            >
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="read">Đã đọc</MenuItem>
              <MenuItem value="replied">Đã trả lời</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              if (selectedContact) {
                handleDelete(selectedContact._id);
              }
            }}
            color="error"
            variant="outlined"
          >
            Xóa
          </Button>
          <Button onClick={() => setDialogOpen(false)} variant="contained">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactAdmin;

