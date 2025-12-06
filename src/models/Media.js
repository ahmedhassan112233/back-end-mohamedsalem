import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    folder: { type: String, default: 'mdh' },
    alt: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
