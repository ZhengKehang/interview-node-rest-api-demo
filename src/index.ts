// src/index.ts
import express from 'express';
import timeRouter from './routes/time';
import fileDownloadRouter from './routes/fileDownload';
import fileUploadRouter from './routes/fileUpload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/time', timeRouter);
app.use('/file', fileDownloadRouter);
app.use('/file', fileUploadRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
