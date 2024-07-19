import express from 'express';
import { addCollaborator,getUserDocuments,getDoc,getnewDocument,getDocumentCollaborators } from '../controller/document-controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-collaborator', authMiddleware, addCollaborator);
router.get('/:userId', getUserDocuments);
router.get('/doc/:id', getDoc);
router.post('/doc/new', getnewDocument);
router.post('/get-collaborator',authMiddleware, getDocumentCollaborators);
export default router;