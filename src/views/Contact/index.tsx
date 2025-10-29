import React from 'react'
import { TextField, Button } from '@mui/material';
import Link from 'next/link';

const Contact = () => {
  return (
    <div className="container py-16 flex flex-col gap-8 max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900 relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-blue-600 after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2">
        Liên hệ với chúng tôi
      </h1>
      <div className="grid grid-cols-2 gap-8 mt-8">
        {/* Thông tin liên hệ */}
        <div className="col-span-2 lg:col-span-1 space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 border-b pb-4">Thông tin liên hệ</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Địa chỉ:</h3>
                <p className='text-gray-600'>123 Đường ABC, Quận XYZ, TP. Quảng Ngãi</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v16l-7-3.5L3 21v-16z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Số điện thoại:</h3>
                <Link href="tel:0789490590" className='text-gray-600 hover:text-blue-600'>0789 490 590</Link>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email:</h3>
                <p className='text-gray-600'>contact@poolandsauna.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6-6H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Giờ làm việc:</h3>
                <p className='text-gray-600'>Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="col-span-2 lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Gửi tin nhắn cho chúng tôi</h2>
          <form className="space-y-6">
            <TextField
              fullWidth
              required
              id="name"
              label="Họ và tên"
              variant="outlined"
            />
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              type="email"
              variant="outlined"
            />
            <TextField
              fullWidth
              required
              id="phone"
              label="Số điện thoại"
              type="tel"
              variant="outlined"
            />
            <TextField
              fullWidth
              required
              id="message"
              label="Nội dung"
              multiline
              rows={5}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                bgcolor: 'rgb(37 99 235)',
                '&:hover': {
                  bgcolor: 'rgb(29 78 216)',
                  transform: 'scale(1.02)',
                },
              }}
            >
              Gửi tin nhắn
            </Button>
          </form>
        </div>
      </div>
      <div className='w-full h-[450px]'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15406.146777041797!2d108.77839432775802!3d15.128842226685613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3169ad404ba0d57f%3A0x4b6373f483d9bf81!2zQ8OieSB4YW5oIFRoacOqbiBN4buZYyAtQ1RZIFhEICYgQ-G6o25oIHF1YW4gVGhpw6puIE3hu5lj!5e0!3m2!1svi!2s!4v1740242495960!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact

