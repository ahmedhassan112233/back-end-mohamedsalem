import dotenv from "dotenv";
dotenv.config(); // ← أهم سطر هنا أيضاً

import { v2 as cloudinary } from "cloudinary";

// Debug to verify values are loaded BEFORE config()
console.log("Cloudinary INIT ENV:", {
  NAME: process.env.CLOUDINARY_NAME,
  KEY: process.env.CLOUDINARY_KEY,
  SECRET: process.env.CLOUDINARY_SECRET
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadToCloudinary = async (req, res) => {
  try {
    const file = req.file;
    const folder = req.body.folder || "mdh";

    if (!file) {
      return res.status(400).json({ message: "لا يوجد ملف مرفوع" });
    }

    const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, { folder });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      folder
    });

  } catch (error) {
    console.error("🔥 Cloudinary Upload Error:", error);
    res.status(500).json({
      message: "خطأ أثناء رفع الصورة",
      error: error.message,
    });
  }
};
