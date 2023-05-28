import express from 'express';
import { addStudent, getStudent, updateStudent, getAdvisees, getStudentsByBatch } from '../controllers/Student/student';
import authentication from "../middleware/authentication"

const router = express.Router();
router.get('/get/:studentId', getStudent);
router.patch('/update', updateStudent);
router.get('/getAdvisees/:advisorCode', getAdvisees)
router.get("/getByBatch/:year", getStudentsByBatch)
router.post("/register", addStudent)

export default router
