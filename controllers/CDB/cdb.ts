import { Request, Response } from "express";
import Complaint from "../../models/complaint";

export const submit_complaint = async (req:Request,res : Response)=>{
    console.log(req.body);
    try{
    const data = await Complaint.create(req.body);
    return res.status(201).json({
        message:"success",
        data : data,
    });
    }
    catch(err){
    return res.status(500).json({
              msg: "failure",
              data: null,
              error: err,
    });
    }
}

export const get_all_complaints = async (req:Request,res:Response)=>{
    try{
    const data = await Complaint.findAll();
    console.log(data);
    res.status(201).json({
        message:"sucessfully fetched complaints",
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}

export const get_filtered_complaints = async (req:Request,res:Response)=>{
    const status = req.query.status;
    console.log(status);
    try{
      const data = await Complaint.findAll({
        where:{
            status:status
        }
    })

    res.send({
        message:`sucessfully fetched filtered complaints : ${status}`,
        data : data
    }).status(201);
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }
}
export const get_stats = async (req:Request,res:Response)=>{
    const rejected = await Complaint.findAll({
        where :{
            status:"rejected"
        }
    });
    const approved = await Complaint.findAll({
        where :{
            status:"approved"
        }
    });

    const pending = await Complaint.findAll({
        where :{
            status:"pending"
        }
    });

    res.send({
        message:"sucessfully fetched stats",
        data : JSON.stringify({
            rej_count : rejected.length,
            approved_count : approved.length,
            pending_count : pending.length
        })
    }).status(201);
}

export const approve_complaint = async(req:Request,res:Response)=>{
    const complaint_id = req.body.complaint_id;
   try{ 
    const data = await Complaint.update({
      status:"approved"
    },{
        where:{
            id:`${complaint_id}`
        }
    });
  
    res.send({
      message:"complaint updated sucessfully",
      data : data
    }).status(201);
  }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
});
    }

    
}

export const forward_complaint = async(req:Request,res:Response)=>{
    const complaint_id = req.body.complaint_id;
    const currdata = await Complaint.findOne({
        where: {
          id:complaint_id
        }
    });
    if (!currdata) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "complaint not found"
      })
    }
    const data = await Complaint.update({
        level : currdata.level+1
    },{
        where:{
            id:complaint_id
        }
    });

    return res.status(201).json({
        message:`complaint forwarded successfully ${currdata.level + 1}`,
        data : data
    });
}

export const reject_complaint = async (req:Request,res:Response)=>{
    try{
      const complaint_id = req.body.complaint_id;
    const data = await Complaint.update({
        status:"rejected"
    },{
        where:{
            id:complaint_id
        }
    });

    res.status(200).json({
        message:"complaint rejected sucessfully",
        data : data
    });
    }
    catch(err){
      return res.status(500).json({
        msg: "failure",
        data: null,
        error: err,
    });
    }
}


// import Student from "../../models/student";
// import User from "../../models/user";

// export const getComplaint = async (req: Request, res: Response) => {
//   try {
//     const complaintId = req.params.complaintId;
//     let complaint = await Complaint.findOne({
//       where: {
//         id: complaintId,
//       },
//     });
//     return res.status(200).json({
//       msg: "success",
//       data: complaint,
//       error: null,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       msg: "failure",
//       data: null,
//       error: e,
//     });
//   }
// };

// export const getComplaintsByLvl = async (req: Request, res: Response) => {
//   try {
//     const lvl = req.params.level
//     let complaints = await Complaint.findAll({
//       where: {
//         level: lvl
//       },
//     });
//     return res.status(200).json({
//       msg: "success",
//       data: complaints,
//       error: null,
//     });
//   } catch (e) {
//     return res.status(500).json({
//       msg: "failure",
//       data: null,
//       error: e,
//     });
//   }
// };

// export const addComplaint = async (req: Request, res: Response) => {
//   try {
//     let complaint = req.body;
//     complaint = await Complaint.create(complaint)
//     return res.status(200).json({
//       msg: "success",
//       data: complaint,
//       error: null
//     })
//   } catch (e) {
//     return res.status(500).json({
//       msg: "failure",
//       data: null,
//       error: e,
//     });
//   }
// }

// export const forwardComplaint = async (req: Request, res: Response) => {
//   try {
//     const complaintId = req.body.id;
//     const level = req.body.level;
//     await Complaint.update({ level: level }, {
//       where: {
//         id: complaintId
//       }
//     })
//     return res.status(200).json({
//       msg: "success",
//       data: null,
//       error: null
//     })
//   } catch (e) {
//     return res.status(500).json({
//       msg: "failure",
//       data: null,
//       error: e,
//     });
//   }
// }
// const { json } = require("sequelize");