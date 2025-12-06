console.log("ENV USER:", process.env.ADMIN_USERNAME);
console.log("ENV PASS:", process.env.ADMIN_PASSWORD);

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';

const router = express.Router();

// Seed admin user if not exists (runs on first login call)
const ensureAdminUser = async () => {
  const existing = await AdminUser.findOne({ username: process.env.ADMIN_USERNAME });
  const plain = process.env.ADMIN_PASSWORD;
  if (!existing && process.env.ADMIN_USERNAME && plain) {
    const hash = await bcrypt.hash(plain, 10);
    await AdminUser.create({
      username: process.env.ADMIN_USERNAME,
      passwordHash: hash,
    });
    console.log('✅ Admin user seeded');
  }
};

router.post('/login', async (req, res) => {
  try {
    await ensureAdminUser();

    const { username, password } = req.body;
    const user = await AdminUser.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: 'بيانات الدخول غير صحيحة' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'خطأ في تسجيل الدخول' });
  }
});

export default router;
