import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    description: { type: String },
    category: { type: String },
    location: { type: String },
    status: {
      type: String,
      enum: ['in-progress', 'completed', 'planned'],
      default: 'completed',
    },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
