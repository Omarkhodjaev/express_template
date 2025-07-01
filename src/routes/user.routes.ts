import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));
router.get('/', authMiddleware, userController.getUsers.bind(userController));
router.get('/:id', authMiddleware, userController.getUser.bind(userController));
router.put('/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router; 