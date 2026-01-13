import Credentials from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";
import { AUTH_SECRET } from "./env";
import NextAuth from "next-auth";


const authOptions : NextAuthConfig = {
    providers : [
        Credentials({
            name : "Credentials",
            credentials : {
                email : {label : "Email",type : "email"},
                password : {label : "Password",type : "password"}
            },
            authorize : async (credentials) => {

                if(!credentials?.email || !credentials?.password){
                    throw new Error("Missing Email or password");
                }

                try {
                    await connectDB();
                    const user = await User.findOne({email : credentials.email})
                    if(!user) throw new Error("User does not exist");
                    const isValid = await bcrypt.compare(credentials.password as string,user.password);

                    if(!isValid) throw new Error("Invalid Password")

                    return {
                        id : user._id.toString()
                    }

                } catch (error) {
                    throw error;
                }

            }

        })
    ],
    callbacks : {
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session ({session,token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session;
        }
    },
    pages : {
        signIn : '/login',
        error : '/login'
    },
    session:{
        strategy : 'jwt',
        maxAge : 30 * 24 *60 *60
    },
    secret : AUTH_SECRET
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);