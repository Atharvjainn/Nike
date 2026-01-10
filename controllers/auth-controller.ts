import type { UserType } from "@/lib/types"
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export const signup = async(data : UserType) => {
    const {email,fullName,password} = data;
    try {
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
        
    } catch (error) {
        console.log("Error in controller")
        throw new Error("Something went wrong in the controller")
    }
} 