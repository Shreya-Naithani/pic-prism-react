import express from 'express';
const router = express.Router();
import { login, refresh, signup, switchProfile } from '../Controllers/authController.js';
import { verifyToken } from '../Middlewares/verifyToken.js';

router.post('/login',login);
router.post('/signup',signup);
router.get('/refresh',refresh);
router.get('/switch',verifyToken , switchProfile);



export default router;