import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/uploadImage";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const mainImage = formData.get("mainImage") as File;
    const imagePath = await uploadImage(mainImage, "projects");

    // Tạo và lưu dự án vào database
    const project = new Project({
      name: formData.get("name"),
      address: formData.get("address"),
      completionYear: formData.get("completionYear"),
      type: formData.get("type"),
      summary: formData.get("summary"),
      mainImage: imagePath,
      createdAt: new Date(),
    });

    await project.save();

    return NextResponse.json(
      { message: "Dự án đã được tạo thành công", project },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Lỗi khi tạo dự án:", error);
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi tạo dự án", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = page * limit;

    const projects = await (Project.find as any)(
      {},
      {},
      { sort: { createdAt: -1 }, skip, limit }
    );

    const total = await Project.countDocuments();

    return NextResponse.json({
      message: "Lấy danh sách dự án thành công",
      data: projects,
      total,
      page,
      limit,
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách dự án:", error);
    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi lấy danh sách dự án",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Thiếu ID dự án" },
        { status: 400 }
      );
    }

    const deletedProject = await (Project.findByIdAndDelete as any)(id);

    if (!deletedProject) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    // Xóa file ảnh chính nếu tồn tại
    try {
      const mainImage: string | undefined = (deletedProject as any).mainImage;
      if (mainImage) {
        // Nếu là URL tuyệt đối thì lấy phần pathname, nếu không thì dùng trực tiếp
        const imagePathname = mainImage.startsWith("http")
          ? new URL(mainImage).pathname
          : mainImage;

        // Đảm bảo chỉ xóa trong thư mục public/uploads
        const relative = imagePathname.replace(/^\/+/, ""); // bỏ dấu /
        const filePath = path.join(process.cwd(), "public", relative);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    } catch (err) {
      console.error("Lỗi khi xóa file ảnh dự án:", err);
      // Không throw để tránh làm fail luôn API xóa dự án
    }

    // Xóa các ảnh được chèn trong summary (SunEditor)
    try {
      const summary: string | undefined = (deletedProject as any).summary;
      if (summary) {
        const imgSrcRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
        let match: RegExpExecArray | null;

        while ((match = imgSrcRegex.exec(summary)) !== null) {
          const src = match[1];
          if (!src) continue;

          const imagePathname = src.startsWith("http")
            ? new URL(src).pathname
            : src;

          const relative = imagePathname.replace(/^\/+/, "");
          const filePath = path.join(process.cwd(), "public", relative);

          if (fs.existsSync(filePath)) {
            try {
              fs.unlinkSync(filePath);
            } catch (err) {
              console.error("Lỗi khi xóa file ảnh trong summary:", err);
            }
          }
        }
      }
    } catch (err) {
      console.error("Lỗi khi xử lý xóa ảnh trong summary:", err);
    }

    return NextResponse.json({
      message: "Xóa dự án thành công",
      data: deletedProject,
    });
  } catch (error: any) {
    console.error("Lỗi khi xóa dự án:", error);
    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi xóa dự án",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
