// src/utils/responseHelper.ts
export const sendResponse = (res: any, data: any, message: string = 'Success', status: number = 200) => {
  res.status(status).json({
    status: status < 400 ? 'success' : 'error',
    message,
    data,
  });
};
