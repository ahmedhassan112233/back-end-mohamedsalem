import mongoose from 'mongoose';

const aiSettingsSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    model: { type: String, default: '' },
    systemPrompt: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('AISettings', aiSettingsSchema);
