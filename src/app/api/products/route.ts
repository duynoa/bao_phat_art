import { NextResponse } from 'next/server';
import Product from '@/models/Product';
import connectDB from '@/lib/db';
import { uploadImage } from '@/lib/uploadImage';

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const formData = await req.formData();
    const files = formData.getAll('images') as File[];
    const name = formData.get('name') as string;
    const shortDesc = formData.get('shortDesc') as string;
    const originalPrice = Number(formData.get('originalPrice'));
    const salePrice = Number(formData.get('salePrice'));
    const discountPercent = Number(formData.get('discountPercent'));
    const specifications = formData.get('specifications') as string;
    
    // Upload nhiều ảnh
    const uploadedImages = [];
    for (const file of files) {
      try {
        const uploadedUrl = await uploadImage(file, 'products');
        uploadedImages.push(uploadedUrl);
      } catch (error) {
        console.error('Lỗi khi upload ảnh:', error);
      }
    }
    
    const product = new Product({
      name,
      shortDesc,
      originalPrice,
      salePrice,
      discountPercent,
      specifications,
      images: uploadedImages
    });
    await product.save();
    
    return NextResponse.json(
      { message: 'Thêm sản phẩm thành công', product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi thêm sản phẩm', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const products = await (Product.find as any)({}, {}, { sort: { createdAt: -1 } });
    
    return NextResponse.json(
      { 
        message: 'Lấy danh sách sản phẩm thành công',
        products 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { 
        message: 'Lỗi khi lấy danh sách sản phẩm', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'ID sản phẩm không được để trống' },
        { status: 400 }
      );
    }

    const deletedProduct = await (Product.findByIdAndDelete as any)(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Xóa sản phẩm thành công', product: deletedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Lỗi server:', error);
    return NextResponse.json(
      { message: 'Lỗi khi xóa sản phẩm', error: error.message },
      { status: 500 }
    );
  }
} 