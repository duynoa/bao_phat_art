import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function uploadImage(file: File, folder: string = 'news'): Promise<string> {
  try {
    const timestamp = new Date().getTime();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const filename = `${timestamp}-${originalName.replace(/\.[^/.]+$/, '')}.webp`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filepath = path.join(uploadDir, filename);
    
    // Chuyển File thành Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nén và chuyển đổi sang webp
    await sharp(buffer)
      .webp({ quality: 80 }) // Chất lượng 80%
      .resize(1920, null, { // Giới hạn chiều rộng tối đa 1920px
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(filepath);
    
    const relativePath = `/uploads/${folder}/${filename}`;
    const configuredBase = process.env.NEXT_PUBLIC_HOST || '';
    const base = configuredBase.replace(/\/$/, '');
    return base ? `${base}${relativePath}` : relativePath;
    
  } catch (error) {
    console.error('Lỗi khi upload ảnh:', error);
    throw new Error('Không thể upload ảnh');
  }
} 