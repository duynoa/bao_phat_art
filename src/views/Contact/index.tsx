"use client";
import React, { useState } from 'react';
import { TextField, Button, Alert, Snackbar } from '@mui/material';
import Link from 'next/link';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Có lỗi xảy ra');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      setSnackbar({
        open: true,
        message: data.message || 'Gửi tin nhắn thành công!',
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.message || 'Có lỗi xảy ra khi gửi tin nhắn',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: 'Địa chỉ',
      content: '16 Trương Định - TP.Quãng Ngãi',
      link: null
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: 'Số điện thoại',
      content: '0789 490 590',
      link: 'tel:0789490590'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: 'Email',
      content: 'baophatart76@gmail.com',
      link: 'mailto:baophatart76@gmail.com'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Giờ làm việc',
      content: 'Thứ 2 - Chủ nhật: 8:00 - 20:00',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Thông tin liên hệ */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Thông tin liên hệ</h2>
            <div className="space-y-5">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 p-2.5 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{item.title}</h3>
                    {item.link ? (
                      <Link 
                        href={item.link} 
                        className="text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.content}
                      </Link>
                    ) : (
                      <p className="text-gray-900">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form liên hệ */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <TextField
                fullWidth
                required
                id="name"
                label="Họ và tên"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="phone"
                label="Số điện thoại"
                type="tel"
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                required
                id="message"
                label="Nội dung tin nhắn"
                multiline
                rows={4}
                variant="outlined"
                value={formData.message}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  bgcolor: '#2563eb',
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: '#1d4ed8',
                  },
                  '&:disabled': {
                    bgcolor: '#9ca3af',
                  },
                }}
              >
                {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
              </Button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <div className="w-full h-[400px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15406.146777041797!2d108.77839432775802!3d15.128842226685613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169ad404ba0d57f%3A0x4b6373f483d9bf81!2zQ8OieSB4YW5oIFRoacOqbiBN4buZYyAtQ1RZIFhEICYgQ-G6o25oIHF1YW4gVGhpw6puIE3hu5lj!5e0!3m2!1svi!2s!4v1740242495960!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Contact;

