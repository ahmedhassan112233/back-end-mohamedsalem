import express from 'express';
import SiteSettings from '../models/SiteSettings.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: get settings
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    res.json(settings);
  } catch (err) {
    console.error('Get settings error:', err);
    res.status(500).json({ message: 'فشل في جلب الإعدادات' });
  }
});

// Admin: update settings
router.put('/', auth, async (req, res) => {
  try {
    const settings = await SiteSettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(settings);
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ message: 'فشل في تحديث الإعدادات' });
  }
});

export default router;
