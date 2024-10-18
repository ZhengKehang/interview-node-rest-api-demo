import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { sendResponse } from '../utils/responseHelper';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 创建新用户
router.post('/', async (req, res) => {
  try {
    const { email, age } = req.body;

    // Email format validation
    if (!validateEmail(email)) {
      return sendResponse(res, null, 'Invalid email format', 400);
    }

    // Ensure age is null if not provided
    const user = userRepository.create({ ...req.body, age: age || null });

    const result = await userRepository.save(user);
    sendResponse(res, result, 'User created successfully', 201);
  } catch (error) {
    sendResponse(res, null, 'User creation failed', 400);
  }
});

// 获取所有用户
router.get('/', async (req, res) => {
  try {
    const users = await userRepository.find();
    sendResponse(res, users, 'Users fetched successfully');
  } catch (error) {
    sendResponse(res, null, 'Error fetching users', 500);
  }
});

// 根据 ID 获取用户
router.get('/:id', async (req, res) => {
  try {
    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return sendResponse(res, null, 'User not found', 404);
    }
    sendResponse(res, user, 'User fetched successfully');
  } catch (error) {
    sendResponse(res, null, 'Error fetching user', 500);
  }
});

// 更新用户
router.put('/:id', async (req, res) => {
  try {
    const { email, age } = req.body;

    // Email format validation
    if (email && !validateEmail(email)) {
      return sendResponse(res, null, 'Invalid email format', 400);
    }

    const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!user) {
      return sendResponse(res, null, 'User not found', 404);
    }

    userRepository.merge(user, { ...req.body, age: age || null });
    const result = await userRepository.save(user);
    sendResponse(res, result, 'User updated successfully');
  } catch (error) {
    sendResponse(res, null, 'Error updating user', 500);
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const result = await userRepository.delete(req.params.id);
    if (result.affected === 0) {
      return sendResponse(res, null, 'User not found', 404);
    }
    sendResponse(res, result, 'User deleted successfully');
  } catch (error) {
    sendResponse(res, null, 'Error deleting user', 500);
  }
});

export default router;
