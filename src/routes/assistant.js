import express from 'express';
import { askAI } from '../services/aiService.js';
import AISettings from '../models/AISettings.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Main assistant endpoint
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'الرسالة مطلوبة' });
    }

    const settings = (await AISettings.findOne()) || {};
    const reply = await askAI({
      prompt,
      model: settings.model || process.env.AI_MODEL,
      systemPrompt: settings.systemPrompt,
      enabled: settings.enabled !== false,
    });

    res.json({ reply });
  } catch (err) {
    console.error('Assistant error:', err);
    res.status(500).json({ message: 'فشل في استخدام المساعد الذكي' });
  }
});

// Get AI settings (admin)
router.get('/settings', auth, async (req, res) => {
  try {
    const settings =
      (await AISettings.findOne()) ||
      (await AISettings.create({
        enabled: true,
        model: process.env.AI_MODEL || '',
        systemPrompt:
          'أنت مساعد ذكي لشركة تشطيبات وديكور اسمها Mohamed Design House. رد دائمًا بالعربية، بلغة واضحة وبسيطة.',
      }));
    res.json(settings);
  } catch (err) {
    console.error('Get AI settings error:', err);
    res.status(500).json({ message: 'فشل في جلب إعدادات الذكاء الاصطناعي' });
  }
});

// Update AI settings (admin)
router.put('/settings', auth, async (req, res) => {
  try {
    const settings = await AISettings.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(settings);
  } catch (err) {
    console.error('Update AI settings error:', err);
    res.status(500).json({ message: 'فشل في تحديث إعدادات الذكاء الاصطناعي' });
  }
});

export default router;
