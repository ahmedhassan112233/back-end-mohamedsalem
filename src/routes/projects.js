import express from 'express';
import Project from '../models/Project.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Public: list projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Get projects error:', err);
    res.status(500).json({ message: 'فشل في جلب الأعمال' });
  }
});

// Public: single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'المشروع غير موجود' });
    res.json(project);
  } catch (err) {
    console.error('Get project error:', err);
    res.status(500).json({ message: 'فشل في جلب بيانات المشروع' });
  }
});

// Admin: create project
router.post('/', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err);
    res.status(500).json({ message: 'فشل في إنشاء المشروع' });
  }
});

// Admin: update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(project);
  } catch (err) {
    console.error('Update project error:', err);
    res.status(500).json({ message: 'فشل في تحديث المشروع' });
  }
});

// Admin: delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'تم حذف المشروع بنجاح' });
  } catch (err) {
    console.error('Delete project error:', err);
    res.status(500).json({ message: 'فشل في حذف المشروع' });
  }
});

export default router;
