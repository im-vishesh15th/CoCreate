import express from 'express';
import { getUserDocuments } from '../controller/user-controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/documents', authMiddleware, getUserDocuments);

export default router;