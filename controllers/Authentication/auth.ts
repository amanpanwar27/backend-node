import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user";
// import Faculty from "../../models/faculty";
// import Student from "../../models/student";
// import "../../models/associations";

// export const userRegister = async (req: Request, res: Response): Promise<Response> => {
//     try {
//         let user = await User.findOne({
//             where: { email: req.body.email }
//         });
//         if (user) {
//             return res.status(400).json({ success: false, errorType: "msg", error: "User already exists. Please Login" })
//         }
//         const data = req.body
//         data.password = bcrypt.hashSync(data.password, 10);
//         user = await User.create(data, { include: Student })
//         delete data.password
//         const token = jwt.sign(data, "supersecretkey")
//         return res.json({ success: true, token })
//     } catch (error) {
//         console.log(error);
//
//         return res.status(500).json({ success: false, errorType: "msg", error: "Internal Server Error" })
//     }
//
// }
import Student from "../../models/student";
import Faculty from "../../models/faculty";

export const userLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
      include: [Student, Faculty],
    });
    if (!user) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "invalid credentials",
      });
    }
    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "invalid credentials",
      });
    }
    const { password, ...data } = user.dataValues;
    const token = jwt.sign(data, "supersecretkey");
    return res.status(200).json({
      msg: "success",
      data: {token,data},
      error: "invalid credentials",
    });
  } catch (error) {
    return res.status(400).json({
      msg: "failure",
      data: null,
      error,
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [Student, Faculty],
    });
    if (!user) {
      return res.status(400).json({
        msg: "failure",
        data: null,
        error: "user does not exist",
      });
    }
    return res.status(400).json({
      msg: "success",
      data: user,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "failure",
      data: null,
      error,
    });
  }
};
