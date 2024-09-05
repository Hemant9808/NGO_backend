import { createPost, deletePost, getAllPost, getPostById, updateEvent } from "../controllers/postContoller"
import express from 'express';

const router = express.Router()

router.route('/createPost').post(createPost);
router.route('/getAllPost').get(getAllPost);
router.route('/getPostById/:id').post(getPostById);
router.route('/deletePost/:id').delete(deletePost);
router.route('/updateEvent/:id').put(updateEvent);

export default router;