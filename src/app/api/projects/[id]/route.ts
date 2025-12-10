import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Project from "@/models/Project";
import { uploadImage } from "@/lib/uploadImage";
import { toSlug } from "@/utils/slug";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: Request,
  props: Props
) {
  try {
    await connectDB();
    const params = await props.params;

    // Lấy project hiện tại để biết ảnh cũ
    const existingProject = await (Project.findById as any)(params.id);

    const formData = await request.formData();

    const name = (formData.get("name") as string) || "";
    const updateData: any = {
      name,
      slug: toSlug(name),
      address: formData.get("address"),
      completionYear: formData.get("completionYear"),
      type: formData.get("type"),
      summary: formData.get("summary"),
    };

    if (updateData.slug !== existingProject?.slug) {
      const duplicated = await (Project.findOne as any)({
        slug: updateData.slug,
        _id: { $ne: params.id },
      });

      if (duplicated) {
        return NextResponse.json(
          { message: "Slug đã tồn tại, vui lòng chọn tên khác" },
          { status: 400 }
        );
      }
    }

    // Xử lý upload ảnh mới nếu có
    const mainImage = formData.get("mainImage") as File;
    if (mainImage && mainImage.size > 0) {
      const imagePath = await uploadImage(mainImage, "projects");
      updateData.mainImage = imagePath;

      // Xóa ảnh cũ nếu tồn tại
      try {
        const oldMainImage: string | undefined = existingProject?.mainImage;
        if (oldMainImage) {
          const imagePathname = oldMainImage.startsWith("http")
            ? new URL(oldMainImage).pathname
            : oldMainImage;

          const relative = imagePathname.replace(/^\/+/, "");
          const filePath = path.join(process.cwd(), "public", relative);

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } catch (err) {
        console.error("Lỗi khi xóa file ảnh mainImage cũ:", err);
      }
    }

    const updatedProject = await (Project.findByIdAndUpdate as any)(params.id, updateData, {
      new: true,
    });

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Cập nhật dự án thành công",
      project: updatedProject,
    });
  } catch (error: any) {
    console.error("Lỗi khi cập nhật dự án:", error);
    return NextResponse.json(
      { message: "Có lỗi xảy ra khi cập nhật dự án", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  props: Props
) {
  try {
    await connectDB();
    const params = await props.params;

    const project = await (Project.findById as any)(params.id);

    if (!project) {
      return NextResponse.json(
        { message: "Không tìm thấy dự án" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Lấy thông tin dự án thành công",
      project,
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy thông tin dự án:", error);
    return NextResponse.json(
      {
        message: "Có lỗi xảy ra khi lấy thông tin dự án",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
