import mongoose, { Document } from 'mongoose';

interface Contact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  status?: 'pending' | 'read' | 'replied';
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'read', 'replied'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.models.Contact || mongoose.model<Contact>('Contact', contactSchema);
export default Contact;

