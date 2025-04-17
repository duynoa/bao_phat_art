import mongoose, { Document } from 'mongoose';

interface News extends Document {
  multiLanguage: {
    vi: {
      title: string;
      content: string;
      slug: string;
    };
    en: {
      title: string; 
      content: string;
      slug: string;
    };
  };
  image: string;
  startDate: Date;
  endDate: Date;
  relatedNewsIds: mongoose.Types.ObjectId[];
  // categories: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new mongoose.Schema({
  multiLanguage: {
    vi: {
      title: { type: String },
      content: { type: String },
      slug: { type: String }
    },
    en: {
      title: { type: String },
      content: { type: String },
      slug: { type: String }
    }
  },
  image: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  relatedNewsIds: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'News',
    default: []
  }],
  // categories: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category'
  // }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

// Thêm validation tùy chỉnh
newsSchema.pre('save', function(next) {
  // Kiểm tra xem có ít nhất một ngôn ngữ có đầy đủ thông tin
  const hasVietnamese = this.multiLanguage?.vi?.title && this.multiLanguage?.vi?.content;
  const hasEnglish = this.multiLanguage?.en?.title && this.multiLanguage?.en?.content;

  if (!hasVietnamese && !hasEnglish) {
    next(new Error('Vui lòng điền đầy đủ thông tin (tiêu đề và nội dung) cho ít nhất một ngôn ngữ'));
  }

  next();
});

const News = mongoose.models.News || mongoose.model<News>('News', newsSchema);
export default News; 