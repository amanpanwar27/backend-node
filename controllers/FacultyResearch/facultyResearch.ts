import { Request, Response } from "express";
import Research from "../../models/facultyResearch";

export const addResearch = async (req: Request, res: Response) => {
  try {
    const research = await Research.create(req.body);
    return res.status(200).json({
      msg: "research added succesfully",
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
};

export const getFacultyResearch = async (req: Request, res: Response) => {
  try {
    const researches = await Research.findAll({
      where: {
        FacultyId: req.params.facultyId,
      },
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
    const researches = await Research.findAll();
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
