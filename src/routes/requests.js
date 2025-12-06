import express from 'express';
import ServiceRequest from '../models/ServiceRequest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: create service request
router.post('/', async (req, res) => {
  try {
    const request = await ServiceRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ message: 'فشل في إرسال طلب الخدمة' });
  }
});

// Admin: list all requests
router.get('/', auth, async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Get requests error:', err);
    res.status(500).json({ message: 'فشل في جلب طلبات الخدمة' });
  }
});

// Admin: update request (status / notes)
router.put('/:id', auth, async (req, res) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(request);
  } catch (err) {
    console.error('Update request error:', err);
    res.status(500).json({ message: 'فشل في تحديث طلب الخدمة' });
  }
});

// Admin: delete request
router.delete('/:id', auth, async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف طلب الخدمة' });
  } catch (err) {
    console.error('Delete request error:', err);
    res.status(500).json({ message: 'فشل في حذف طلب الخدمة' });
  }
});

export default router;
