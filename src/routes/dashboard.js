import express from 'express';
import { auth } from '../middleware/auth.js';
import Project from '../models/Project.js';
import Lead from '../models/Lead.js';
import Media from '../models/Media.js';
import ServiceRequest from '../models/ServiceRequest.js';

const router = express.Router();

router.get('/stats', auth, async (req, res) => {
  try {
    const [projectsCount, leadsCount, mediaCount, requestsCount] =
      await Promise.all([
        Project.countDocuments(),
        Lead.countDocuments(),
        Media.countDocuments(),
        ServiceRequest.countDocuments(),
      ]);

    const latestLeads = await Lead.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const latestRequests = await ServiceRequest.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    res.json({
      projectsCount,
      leadsCount,
      mediaCount,
      requestsCount,
      latestLeads,
      latestRequests,
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ message: 'فشل في جلب إحصائيات لوحة التحكم' });
  }
});

export default router;
