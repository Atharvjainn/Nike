import mongoose, { Schema } from "mongoose";
import type {UserType} from '../lib/types'

const UserSchema = new Schema<UserType>({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    name : {
        type : String,
        required : true
    },
},{timestamps : true})

const User = mongoose.models.User || mongoose.model('User',UserSchema);
export default User;