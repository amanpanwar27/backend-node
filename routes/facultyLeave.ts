import express from "express"
import { getAllLeaves, applyLeave, getFacultyLeaves, getLeavesByDept } from "../controllers/FacultyLeave/facultyLeave"
import authentication from "../middleware/authentication"

const router = express.Router()

router.post("/apply", authentication, applyLeave)
router.get("/getAllLeaves", authentication, getAllLeaves)
router.get("/getFacultyLeaves/", authentication, getFacultyLeaves)
router.get("/getLeavesByDept/", authentication, getLeavesByDept)

export default router
