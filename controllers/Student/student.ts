import { Request, Response } from "express";
import Student from "../../models/student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";
import Faculty from "../../models/faculty";

export const addStudent = async (req: Request, res: Response) => {
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
    data.user = user.toJSON();
    delete data.user.password;
    let student;
    try {
      student = await Student.create({ ...data.student, UserId: user.id });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        msg: "failure",
        data: null,
        error:
          "Unable to register! This may be due to invalid input, else try again after some time",
      });
    }
    data.student = student.toJSON();
    const token = jwt.sign(data, "supersecretkey");
    return res.json({ success: true, token, data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failure",
      data: null,
      error,
    });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const studentId: string = req.params.studentId;
    // const isStudent = res.locals.user.user.isStudent;
    // const isFaculty = res.locals.user.user.isFaculty;
    // if (isStudent === true) {
    //   if (studentId === res.locals.user.student.id)
    // }
    let student = await Student.findOne({
      include: User,
      where: { id: studentId },
    });
    if (!student) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "student not found",
      });
    }
    return res.status(200).json({
      msg: "success",
      data: student,
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

export const getStudentsByBatch = async (req: Request, res: Response) => {
  const batch = req.params.year;
  try {
    let student = await Student.findOne({
      include: User,
      where: { batch: batch },
    });
    if (!student) {
      return res.status(404).json({
        msg: "failure",
        data: null,
        error: "student not found",
      });
    }
    return res.status(200).json({
      msg: "success",
      data: student,
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

export const updateStudent = async (req: Request, res: Response) => {
  try {
    let student = req.body;
    const studentId = student.id;
    delete student["id"];
    await Student.update(student, {
      where: { id: studentId },
    });
    return res.status(200).json({
      msg: "success",
      data: null,
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

export const getAdvisees = async (req: Request, res: Response) => {
  const advisorCode = req.params.advisorCode;
  try {
    let students = await Student.findAll({
      include: User,
      where: {
        FacultyId: advisorCode,
      },
    });
    return res.status(200).json({
      msg: "success",
      data: students,
      error: null,
    });
  } catch (e) {
    return res.status(200).json({
      msg: "failure",
      data: null,
      error: e,
    });
  }
};
