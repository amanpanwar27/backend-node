import express from "express";
// import { getComplaint, getComplaintsByLvl, addComplaint, forwardComplaint } from "../controllers/CDB/cdb"

// const router = express.Router();

// router.get("/get/:id", getComplaint)
// router.get("/getByLevel/:level", getComplaintsByLvl)
// router.post("/add", addComplaint)
// router.patch("/forward", forwardComplaint)

// export default router
import  {
    submit_complaint,
    get_all_complaints,
    get_filtered_complaints,
    get_stats
    ,approve_complaint,
    forward_complaint,
    reject_complaint
    } from "../controllers/CDB/cdb";
    const Route = express.Router();
    
    // students apis routes
    Route.post("/submit_complaint",submit_complaint);
    Route.get("/get_all_complaints",get_all_complaints);
    Route.get("/get_filtered_complaints",get_filtered_complaints)
    
    
    //admin apis routes
    Route.get("/get_stats",get_stats);
    Route.post("/approve_complaint",approve_complaint);
    Route.post("/forward_complaint",forward_complaint);
    Route.post("/reject_complaint",reject_complaint);
    
export default Route;