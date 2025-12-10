import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  completionYear: { type: String, required: true },
  type: { type: String, required: true },
  summary: { type: String, required: true },
  mainImage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 