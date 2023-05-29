import express from "express";
import {
  getAllLeaves,
  applyLeave,
  getFacultyLeaves,
  getLeavesByDept,
  approveLeave,
  getFacultyLeaveById
} from "../controllers/FacultyLeave/facultyLeave";
import authentication from "../middleware/authentication";

const router = express.Router();

router.post("/apply", authentication, applyLeave);
router.get("/getAllLeaves", authentication, getAllLeaves);
router.get("/getFacultyLeaves/", authentication, getFacultyLeaves);
router.get("/getLeavesByDept/", authentication, getLeavesByDept);
router.patch("/approve/:facultyLeaveId", authentication, approveLeave);
router.get("/getLeaveById/:facultyLeaveId", authentication, getFacultyLeaveById);

export default router;
