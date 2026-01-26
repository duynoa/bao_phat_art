import { NextRequest, NextResponse } from 'next/server';
import Contact from '@/models/Contact';
import connectDB from '@/lib/db';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(req: NextRequest, props: Props) {
  try {
    await connectDB();
    const params = await props.params;
    const body = await req.json();
    const { status } = body;

    if (!status || !['pending', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { message: 'Trạng thái không hợp lệ' },
        { status: 400 }
      );
    }

    const contact = await (Contact.findByIdAndUpdate as any)(
      params.id,
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!contact) {
      return NextResponse.json(
        { message: 'Không tìm thấy liên hệ' },
        { status: 404 }
      );
    }

    const contactData = {
      ...contact.toObject(),
      _id: contact._id.toString(),
    };

    return NextResponse.json(
      { message: 'Cập nhật trạng thái thành công', contact: contactData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi cập nhật trạng thái', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, props: Props) {
  try {
    await connectDB();
    const params = await props.params;

    const deletedContact = await (Contact.findByIdAndDelete as any)(params.id);

    if (!deletedContact) {
      return NextResponse.json(
        { message: 'Không tìm thấy liên hệ' },
        { status: 404 }
      );
    }

    const contactData = {
      ...deletedContact.toObject(),
      _id: deletedContact._id.toString(),
    };

    return NextResponse.json(
      { message: 'Xóa liên hệ thành công', contact: contactData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi xóa liên hệ', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, props: Props) {
  try {
    await connectDB();
    const params = await props.params;

    const contact = await (Contact.findById as any)(params.id);

    if (!contact) {
      return NextResponse.json(
        { message: 'Không tìm thấy liên hệ', contact: null },
        { status: 404 }
      );
    }

    const contactData = {
      ...contact.toObject(),
      _id: contact._id.toString(),
    };

    return NextResponse.json(
      { message: 'Lấy thông tin liên hệ thành công', contact: contactData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy thông tin liên hệ', error: error.message },
      { status: 500 }
    );
  }
}

