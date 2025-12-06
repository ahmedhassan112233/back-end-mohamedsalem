import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    serviceType: { type: String }, // تشطيب كامل، دهانات، جبسنبورد، تصميم داخلي...
    details: { type: String },
    preferredDate: { type: Date },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'done', 'cancelled'],
      default: 'new',
    },
    notes: { type: String }, // ملاحظات الأدمن
    source: { type: String, default: 'website' },
  },
  { timestamps: true }
);

export default mongoose.model('ServiceRequest', serviceRequestSchema);
