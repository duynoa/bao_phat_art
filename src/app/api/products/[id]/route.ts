import connectDB from "@/lib/db";
import { uploadImage } from "@/lib/uploadImage";
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(req: NextRequest, props: Props) {
  try {
    await connectDB();
    const params = await props.params;

    const formData = await req.formData();
    const files = formData.getAll("images") as File[];
    const name = formData.get("name") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const originalPrice = Number(formData.get("originalPrice"));
    const salePrice = Number(formData.get("salePrice"));
    const discountPercent = Number(formData.get("discountPercent"));
    const specifications = formData.get("specifications") as string;

    // Kiểm tra sản phẩm tồn tại
    const existingProduct = await (Product.findOne as any)({ _id: params.id });
    if (!existingProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    // Upload ảnh mới nếu có
    const uploadedImages = [];
    if (files.length > 0) {
      for (const file of files) {
        try {
          const uploadedUrl = await uploadImage(file, "products");
          uploadedImages.push(uploadedUrl);
        } catch (error) {
          console.error("Lỗi khi upload ảnh:", error);
        }
      }
    }

    // Cập nhật thông tin sản phẩm
    const updatedProduct = await (Product.findOneAndUpdate as any)(
      { _id: params.id },
      {
        name,
        shortDesc,
        originalPrice,
        salePrice,
        discountPercent,
        specifications,
        ...(uploadedImages.length > 0 && { images: uploadedImages }),
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Cập nhật sản phẩm thành công", product: updatedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi server:", error);
    return NextResponse.json(
      { message: "Lỗi khi cập nhật sản phẩm", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, props: Props) {
  try {
    await connectDB();
    const params = await props.params;

    const product = await (Product.findById as any)(params.id);
    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Lấy thông tin sản phẩm thành công", product },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Lỗi server:", error);
    return NextResponse.json(
      { message: "Lỗi khi lấy thông tin sản phẩm", error: error.message },
      { status: 500 }
    );
  }
}
