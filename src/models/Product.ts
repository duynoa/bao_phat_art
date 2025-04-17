import mongoose, { Document } from 'mongoose';

interface Product extends Document {
  name: string;
  shortDesc?: string;
  originalPrice: number;
  salePrice?: number;
  discountPercent?: number;
  specifications?: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String },
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number },
  discountPercent: { type: Number },
  specifications: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model<Product>('Product', productSchema);
export default Product; 