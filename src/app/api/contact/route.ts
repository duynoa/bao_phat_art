import { NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import connectDB from '@/lib/db';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Email không hợp lệ' },
        { status: 400 }
      );
    }

    // Validate phone format (Vietnamese phone numbers)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { message: 'Số điện thoại không hợp lệ' },
        { status: 400 }
      );
    }

    // Create contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      status: 'pending'
    });

    await contact.save();

    // Chuyển đổi ObjectId thành string để JSON serialize
    const contactData = {
      ...contact.toObject(),
      _id: contact._id.toString(),
    };

    return NextResponse.json(
      { 
        message: 'Gửi tin nhắn thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.', 
        contact: contactData 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi gửi tin nhắn', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const query: any = {};
    if (status && ['pending', 'read', 'replied'].includes(status)) {
      query.status = status;
    }

    const contacts = await (Contact.find as any)(query).sort({ createdAt: -1 });
    
    // Chuyển đổi tất cả ObjectId thành string
    const contactsData = contacts.map((contact: any) => ({
      ...contact.toObject(),
      _id: contact._id.toString(),
    }));

    return NextResponse.json(
      { message: 'Lấy danh sách liên hệ thành công', contacts: contactsData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách liên hệ', error: error.message },
      { status: 500 }
    );
  }
}

