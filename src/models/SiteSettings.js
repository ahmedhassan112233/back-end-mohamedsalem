import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Mohamed Design House' },
    logo: { type: String, default: '/public/images/logo-mohamed.png' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    about: {
      type: String,
      default:
        'شركة متخصصة في التشطيبات والدهانات والديكور والجبسنبورد وتجهيز الشقق والفيلات والمكاتب، بإدارة المهندس محمد محمود سالم.',
    },
    footer: {
      type: String,
      default:
        'جميع الحقوق محفوظة لشركة Mohamed Design House. تطوير وتنفيذ البنية التقنية: أحمد حسن سالم.',
    },
    address: { type: String, default: 'Cairo – Egypt' },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
