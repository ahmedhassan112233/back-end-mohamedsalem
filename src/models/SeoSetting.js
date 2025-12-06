import mongoose from 'mongoose';

const seoSettingSchema = new mongoose.Schema(
  {
    page: { type: String, required: true, unique: true }, // home, about, projects, assistant, etc.
    title: { type: String },
    description: { type: String },
    keywords: [{ type: String }],
    ogImage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('SeoSetting', seoSettingSchema);
