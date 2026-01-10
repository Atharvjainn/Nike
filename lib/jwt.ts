import type { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./env";
import User from "@/models/User";


export interface AuthTokenPayload extends JwtPayload{
    userId : string
}

export const generateToken = (userId : string) : string => {
    const token = jwt.sign({userId},JWT_SECRET as string,{expiresIn : "7d"})
    return token;
}


export const verifyToken = async(token : string) => {
    if(!token) throw new Error("Unauthorised! No Token Provided");
    const decoded = jwt.verify(token,JWT_SECRET as string) as AuthTokenPayload;
    if(!decoded) throw new Error("Unauthorised! Invalid Token");
    const user = await User.findById(decoded.userId).select("-password")
    return user;
}