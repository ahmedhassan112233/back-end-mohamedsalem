import express from 'express';
import SeoSetting from '../models/SeoSetting.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: get SEO for specific page
router.get('/:page', async (req, res) => {
  try {
    const seo = await SeoSetting.findOne({ page: req.params.page });
    res.json(seo);
  } catch (err) {
    console.error('Get SEO error:', err);
    res.status(500).json({ message: 'فشل في جلب إعدادات السيو' });
  }
});

// Admin: list all SEO settings
router.get('/', auth, async (req, res) => {
  try {
    const seo = await SeoSetting.find().sort({ page: 1 });
    res.json(seo);
  } catch (err) {
    console.error('List SEO error:', err);
    res.status(500).json({ message: 'فشل في جلب إعدادات السيو' });
  }
});

// Admin: upsert SEO for page
router.put('/:page', auth, async (req, res) => {
  try {
    const seo = await SeoSetting.findOneAndUpdate(
      { page: req.params.page },
      { ...req.body, page: req.params.page },
      { new: true, upsert: true }
    );
    res.json(seo);
  } catch (err) {
    console.error('Update SEO error:', err);
    res.status(500).json({ message: 'فشل في تحديث إعدادات السيو' });
  }
});

export default router;
