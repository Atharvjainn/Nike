import { generateToken } from "@/lib/jwt";
import type { UserType } from "@/lib/types"
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export const signup = async(data : UserType) => {
    const {email,fullName,password} = data;
    const user = await User.findOne({
        email : email
    })
    if(user){
        throw new Error("Email already Exists!")
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        email,fullName,password : hashedpassword
    })
    const token = generateToken(newUser._id);
    return newUser;
    
} 