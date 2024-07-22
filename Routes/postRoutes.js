import express from 'express';
import { createPost, getAllPost, getMyPosts } from '../Controllers/postController.js';
import { verifyToken } from '../Middlewares/verifyToken.js';
const router = express.Router();

router.post('/create',verifyToken, createPost);

router.get('/getAll',getAllPost);
router.get('/myPosts',verifyToken,getMyPosts);

export default router;