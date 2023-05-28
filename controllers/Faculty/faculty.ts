import { Request, Response } from "express";
import Faculty from "../../models/faculty";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addFacultyDetails=async(req:Request, res:Response):Promise<Response>=>{
  try {
    const data = req.body;
    let user = await User.findOne({
      where: { email: data.user.email },
    });
    if (user) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "user already exists, please login",
      });
    }
    data.user.password = bcrypt.hashSync(data.user.password, 10);
    user = await User.create(data.user);
    data.user = user.toJSON()
    delete data.user.password;
    const faculty = await Faculty.create({...data.faculty, UserId: user.id })
    // user.setFaculty(faculty)
    const token = jwt.sign(data, "supersecretkey");
    data.faculty = faculty.toJSON()
    return res.json({ success: true, token, data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failure",
      data: null,
      error,
    });
  }
  // const {qualification,designation,department} = req.body

  // try {
  //     // const err = validationResult(req)
  //     // if(!err.isEmpty()){
  //     //     return res.status(400).json({success:false,errorType:"array",error:err.array()})
  //     // }
  //     let faculty= await Faculty.findOne({where:{userId:res.locals.user.id}})
  //     if(faculty){
  //         return res.status(401).json({msg:"failure",data:"msg",error:"faculty deatils already exists"})
  //     }
  //     faculty=await Faculty.create({...req.body, userId:res.locals.user.id})
  //     console.log(faculty);
  //
  //     return res.status(200).json({msg:"success",data:faculty,error:null})
  // } catch (error) {
  //     console.log(error);
  //
  //     return res.status(500).json({success:false,errorType:"msg",error:"Internal server error"})
  // }

}
export const getFaculty = async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.facultyId;
    let faculty = await Faculty.findOne({
      include: User,
      where: { id: facultyId },
    });
    if (!faculty) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "faculty not found",
      });
    }
    return res.status(200).json({
      msg: "success",
      data: faculty,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};

export const getAllFaculty = async (req: Request, res: Response) => {
    try {
        let faculties = await Faculty.findAll()
        return res.status(200).json({
            msg: "success",
            data: faculties,
            error: null
        })
    } catch (e) {
        return res.status(500).json({
            msg: "failure",
            data: null,
            error: e
        })
    }
}
