// src/routes/time.ts
import { Router } from 'express';
import { sendResponse } from '../utils/responseHelper';

const router = Router();

router.get('/', (req, res) => {
  const serverTime = new Date().toISOString();
  sendResponse(res, serverTime, 'Server time retrieved');
});

export default router;
