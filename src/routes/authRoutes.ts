// routes/authRoutes.ts
import { Router } from 'express';
import { signup, login, resetPassword, forgotPassword } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/resetpassword', resetPassword);
router.post('/forgotpassword', forgotPassword);

export default router;
