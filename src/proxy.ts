import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  // Lấy token từ cookie
  const token = request.cookies.get('token')?.value;
  
  // Đường dẫn đăng nhập
  const loginUrl = new URL('/admin/login', request.url);
  
  // Nếu đang truy cập trang đăng nhập, cho phép
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }
  
  // Chỉ áp dụng middleware cho các route admin dashboard
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      // Xác thực token
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secretKey);
      
      // Kiểm tra quyền admin
      if (payload.role !== 'admin') {
        return NextResponse.redirect(loginUrl);
      }
      
      // Cho phép truy cập
      return NextResponse.next();
    } catch (error: any) {
      console.log(error);
      return NextResponse.redirect(loginUrl);
    }
  }
}

// Chỉ áp dụng middleware cho các đường dẫn admin
export const config = {
  matcher: ['/admin/:path*'],
}; 