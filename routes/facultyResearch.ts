import express from 'express';
import { addResearch, getFacultyResearch, getAllResearch, getResearch } from '../controllers/FacultyResearch/facultyResearch';
import authentication from '../middleware/authentication';

const router = express.Router();
router.post('/addResearch',authentication, addResearch)
router.get('/getFacultyResearch/:facultyId', getFacultyResearch)
router.get('/getAllResearch', getAllResearch)
router.get('/getResearch', getResearch)

export default router
