// src/routes/fileDownload.ts
import { Router } from 'express';
import { sendResponse } from '../utils/responseHelper';
import path from 'path';

const router = Router();

router.get('/download', (req, res) => {
  const filePath = path.join(__dirname, '../../files/test.txt');
  res.download(filePath, (err) => {
    if (err) {
      sendResponse(res, null, 'File not found', 404);
    }
  });
});

export default router;
