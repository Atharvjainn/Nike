'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";


export const signUp = async(email : string,password : string,name : string) => {
    const result = await auth.api.signUpEmail({
        body : {
            email,password,name,callbackURL:"/logout",
        }
    })
    return result;
}

export const signInSocial = async(provider : 'google' | 'github') => {
    const { url } = await auth.api.signInSocial({
        body : {
            provider,callbackURL:"/logout",
        }
    })
    if(url){
        redirect(url);    
    }
}

export const signIn = async(email : string,password : string) => {
    const result = await auth.api.signInEmail({
        body : {
            email,password,callbackURL:"/logout",
        }
    })
    return result;
}

export const signOut = async() => {
    const result = await auth.api.signOut({
        headers : await headers(),
    })
    return result;
}