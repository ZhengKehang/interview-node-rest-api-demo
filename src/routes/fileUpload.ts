import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { sendResponse } from '../utils/responseHelper';
import express from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return sendResponse(res, null, 'File upload failed', 400);
  }

  const filePath = `/uploads/${req.file.filename}`;
  sendResponse(res, { filePath }, 'File uploaded successfully');
});

// 访问上传的文件
router.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

export default router;
