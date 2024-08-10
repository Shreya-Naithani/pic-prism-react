import express from 'express';
import { addToFavourites, createPost, deletePost, getAllPost, getFavourites, getMyPosts, removeFromFavourites, searchPost } from '../Controllers/postController.js';
import { verifyToken } from '../Middlewares/verifyToken.js';
const router = express.Router();

router.post('/create',verifyToken, createPost);

router.get('/getAll',getAllPost);
router.get('/myPosts',verifyToken,getMyPosts);
router.delete('/delete/:id',verifyToken,deletePost);
router.get('/search',searchPost);
router.put('addToFavourites/:postId',verifyToken ,addToFavourites);
router.put('removeFromFavourites/:postId',verifyToken ,removeFromFavourites);
router.get('getfavourites',verifyToken,getFavourites);

export default router;