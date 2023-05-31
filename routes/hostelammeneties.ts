import express from "express";
import  {
    submit_complaint,
    get_all_complaints,
    get_filtered_complaints,
    get_stats
    ,approve_complaint,
    forward_complaint,
    reject_complaint
    } from "../controllers/HostelAmmenties/hostelammeneties";
    const Route = express.Router();
    
    // students apis routes
    Route.post("/submit_complaint_hostel",submit_complaint);
    Route.get("/get_all_complaints_hostel",get_all_complaints);
    Route.get("/get_filtered_complaints_hostel",get_filtered_complaints)
    
    
    //admin apis routes
    Route.get("/get_stats_hostel",get_stats);
    Route.post("/approve_complaint_hostel",approve_complaint);
    Route.post("/forward_complaint_hostel",forward_complaint);
    Route.post("/reject_complaint_hostel",reject_complaint);
    
export default Route;