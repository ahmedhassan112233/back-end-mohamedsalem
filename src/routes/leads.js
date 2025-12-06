import express from 'express';
import Lead from '../models/Lead.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: create lead (contact form)
router.post('/', async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (err) {
    console.error('Create lead error:', err);
    res.status(500).json({ message: 'فشل في إرسال الطلب' });
  }
});

// Admin: get all leads
router.get('/', auth, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    console.error('Get leads error:', err);
    res.status(500).json({ message: 'فشل في جلب العملاء' });
  }
});

// Admin: update lead status
router.put('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(lead);
  } catch (err) {
    console.error('Update lead error:', err);
    res.status(500).json({ message: 'فشل في تحديث بيانات العميل' });
  }
});

export default router;
