import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
const authentication = async(req:Request, res:Response,next:NextFunction)=>{
    const token = req.header('token');
    if(!token){
        return res.status(401).json({error:"Access Denied"})
    }
    try {
        const data = jwt.verify(token,"supersecretkey");
        console.log(data);
        
        res.locals.user = data
        // res.locals.user=res.locals.user.user;
        
        next();
    } catch (error) {
        return res.status(401).json({error:"Access Denied"})
    }
}

export default authentication