import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/uploadImage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // SunEditor mặc định gửi file với key "file-0"
    let file = formData.get("file-0") as File | null;

    // Trường hợp sau này bạn tự gửi với key khác
    if (!file) {
      file = formData.get("image") as File | null;
    }

    if (!file) {
      return NextResponse.json(
        { error: "Không có file ảnh" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(file, "projects");

    // Định dạng response phù hợp với SunEditor
    return NextResponse.json({
      result: [
        {
          url: imageUrl,
          name: file.name,
        },
      ],
    });
  } catch (error: any) {
    console.error("Lỗi upload ảnh:", error);
    return NextResponse.json(
      { error: "Upload ảnh thất bại", message: error.message },
      { status: 500 }
    );
  }
}


