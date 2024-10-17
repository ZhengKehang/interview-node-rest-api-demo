// src/index.ts
import express from 'express';
import timeRouter from './routes/time';
import fileDownloadRouter from './routes/fileDownload';
import fileUploadRouter from './routes/fileUpload';
import dotenv from 'dotenv';
import userRouter from './routes/user';
import {AppDataSource} from "./data-source";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 配置数据dotenv.config();库连接

AppDataSource.initialize().then(() => {
  console.log('Database connected');
  app.use(express.json());
  app.use('/users', userRouter);
  app.use('/time', timeRouter);
  app.use('/file', fileDownloadRouter);
  app.use('/file', fileUploadRouter);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
  .catch((error) => console.log('Database connection failed:', error));
