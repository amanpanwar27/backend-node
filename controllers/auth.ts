import { Request, Response, CookieOptions } from "express";
import User from "../models/user.js"
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'
export const register = async (req: Request, res: Response) => {

    const email: string = req.body.email
    let password: string = req.body.password

    if (!email) {
        res.status(400).json({ "error": "Email can not be empty" })
    }

    if (!password) {
        res.status(400).json({ "error": "Password can not be empty" })
    }

    let user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user) {
        res.status(409).json({ "error": "Email already registered" })
        return
    }
    try {
        password = hashSync(password, 10);
        user = await User.create({ email: email, password: password })
        const jsontoken = jsonwebtoken.sign({ user: user }, process.env.SECRET_KEY || "supersecret", { expiresIn: '30m' });
        const cookieOptions: CookieOptions = { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(Number(new Date()) + 30 * 60 * 1000) } //we add secure: true, when using https.
        res.cookie('token', jsontoken, cookieOptions);
        res.status(200)
        res.json({ token: jsontoken, email: email });
    } catch (e) {
        console.log(e)
    }
}

export const login = async (req: Request, res: Response) => {
    const email = req.body.email
    let password = req.body.password
    if (!email) {
        res.status(400).json({ "error": "Email can not be empty" })
    }

    if (!password) {
        res.status(400).json({ "error": "Password can not be empty" })
    }

    let user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) {
        res.status(400).json({ "error": "user not found" })
        return
    }
}
