import { Request, Response } from "express";
import HostelComplaint from "../../models/hostelcomplaint";

export const submit_complaint = async (req:Request,res : Response)=>{
    console.log(req.body);
    try{
      const data = await HostelComplaint.create(req.body);
    return res.status(201).json({
        message:"Sucessfully inserted in DB",
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

export const get_all_complaints = async (req:Request,res:Response)=>{
    try{
    const data = await HostelComplaint.findAll();
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
      const data = await HostelComplaint.findAll({
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
    const rejected = await HostelComplaint.findAll({
        where :{
            status:"rejected"
        }
    });
    const approved = await HostelComplaint.findAll({
        where :{
            status:"approved"
        }
    });

    const pending = await HostelComplaint.findAll({
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
    const data = await HostelComplaint.update({
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
    const currdata = await HostelComplaint.findOne({
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

    const data = await HostelComplaint.update({
        level : currdata.level + 1
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
    const data = await HostelComplaint.update({
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
