import "dotenv/config"
import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "";
export default function authMiddelware(req:Request,res:Response,next:NextFunction){
    const Authorization:string = req.headers.authorization || "";
    if(!Authorization || !Authorization.startsWith("Bearer")){
        res.status(403).json({error: "Authentication Denied"});
    }

    const token = Authorization.split(" ")[1];
    try{
        let result: jwt.JwtPayload | undefined;
        const decodedToken = jwt.verify(token, JWT_SECRET);
        if (typeof decodedToken !== "string" && "id" in decodedToken) {
            result = decodedToken as jwt.JwtPayload;
            req.body = {
                ...req.body,
                userId: result.id
            }
        }
        else{
            res.status(403).json({error: "Authentication Denied , inside try"});
        }
        next();
    }
    catch(err){
       res.status(401).json({error: "Invalid or Expired Token", details: err});
    }
    

}