import { Router } from 'express';
import {
  login,
  signup,
  forgotPassword,
  googleLogin,
} from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  googleLoginSchema,
} from '../schemas/auth';

const router = Router();

router.post('/signup', validateBody(signupSchema), signup);
router.post('/login', validateBody(loginSchema), login);
router.post('/forgot-password', validateBody(forgotPasswordSchema), forgotPassword);
router.post('/google-login', validateBody(googleLoginSchema), googleLogin);

export default router;
