import { Request, Response } from "express";
import Research from "../../models/facultyResearch";
import Faculty from "../../models/faculty";
import User from "../../models/user";

export const addResearch = async (req: Request, res: Response) => {
  console.log(req.body);
  
  try {
    let research = await Research.findOne({
      where:
      {journalISBNNo: req.body.journalISBNNo}
    })
    if(research){
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "research already exists",
      });
    }
    research = await Research.create({...req.body,FacultyId:res.locals.user.faculty.id});
    return res.status(200).json({
      msg: "success",
      data: research,
      error: null,
    });
  } catch (e) {
    console.log(e);
    
    return res.status(500).json({
      msg: "failed",
      data: null,
      error: e,
    });
  }
};

export const getFacultyResearch = async (req: Request, res: Response) => {
  try {
    const researches = await Research.findAll({
      where: {
        FacultyId: req.params.facultyId,
      },
      include:{
        model:Faculty
      }
    });
    return res.status(200).json({
      msg: "succes",
      data: researches,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "failed",
      data: null,
      error: e,
    });
  }
};

export const getAllResearch = async (req: Request, res: Response) => {
  try {
    const researches = await Research.findAll({
      include:[{model:Faculty,include:[{model:User}]}]
    });
    return res.status(200).json({
      msg: "success",
      data: researches,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "failed",
      data: null,
      error: e,
    });
  }
};

export const getResearch = async (req: Request, res: Response) => {
  try {
    const researchId = req.body.researchId;
    const research = await Research.findOne({
      where: {
        id: researchId
      }
    })
    return res.status(200).json({
      msg: "success",
      data: research,
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      msg: "failed",
      data: null,
      error: e,
    });
  }
}
