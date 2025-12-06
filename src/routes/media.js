import express from "express";
import upload from "../middleware/upload.js";
import { uploadToCloudinary } from "../services/cloudinary.js";
import Media from "../models/Media.js";

const router = express.Router();

// رفع صورة
router.post("/upload", upload.single("file"), uploadToCloudinary);

// جلب كل الوسائط
router.get("/", async (req, res) => {
    try {
        const media = await Media.find().sort({ createdAt: -1 });
        res.json(media);
    } catch (err) {
        res.status(500).json({ message: "خطأ أثناء جلب الوسائط" });
    }
});

// حذف وسائط
router.delete("/:id", async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: "الصورة غير موجودة" });
        }

        await Media.findByIdAndDelete(req.params.id);

        res.json({ message: "تم حذف الصورة" });
    } catch (err) {
        res.status(500).json({ message: "خطأ أثناء الحذف" });
    }
});

export default router;
