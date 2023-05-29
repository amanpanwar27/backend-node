import Faculty from "../../models/faculty";
import User from "../../models/user";
import { Request, Response } from "express";
import FacultyLeave from "../../models/facultyLeave";

export const applyLeave = async (req: Request, res: Response) => {
  try {
    const facultyLeave = req.body;
    let file = req.file;
    let faculty = await Faculty.findOne({
      where: { id: res.locals.user.faculty.id },
    });
    if (!faculty) {
      return res
        .status(404)
        .json({ msg: "failure", data: null, error: "access denied" });
    }
    let leave = await FacultyLeave.create({
      ...facultyLeave,
      fileDocument: file,
      FacultyId:res.locals.user.faculty.id
    });
    return res.status(200).json({
      msg: "success",
      data: leave,
      error: null,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Get All Leaves Details of One faculty using faculty id
export const getFacultyLeaves = async (req: Request, res: Response) => {
  try {
    let facultyId = res.locals.user.faculty.id;
    let faculty = await Faculty.findOne({
      where: { id: facultyId },
    });
    if (!faculty) {
      return res
        .status(404)
        .json({ msg: "failure", data: null, error: "access denied" });
    }
    const leaves = await FacultyLeave.findAll({
      where: { FacultyId: facultyId },
    });
    res.status(200).json({ msg: "success", data: leaves, error: null });
  } catch (error) {
    res.status(500).json({ msg: "failure", data: null, error });
  }
};

export const getLeavesByDept = async (req: Request, res: Response) => {
  try {
    let department = res.locals.user.faculty.hodOfDepartment;
    if (!department) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "access denied"
      })
    }
    let leaves = await FacultyLeave.findAll({
      
      include: [
        {
          model: Faculty,
          where:{
            department
          }
        },
      ],
    });
    console.log(leaves);
    
    return res.status(200).json({
      msg: "success",
      data: leaves,
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

export const getAllLeaves = async (req: Request, res: Response) => {
  try {
    const deanOfClg = res.locals.user.faculty.deanOfCollege;
    if (!deanOfClg) {
      return res.status(200).json({
        msg: "success",
        data: null,
        error: "access denied"
      })
    }
    let leaves = await FacultyLeave.findAll();
    return res.status(200).json({
      msg: "success",
      data: leaves,
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
