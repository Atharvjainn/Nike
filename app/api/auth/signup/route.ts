import { signup } from "@/controllers/auth-controller";
import connectDB from "@/lib/db";
import { NextResponse,NextRequest } from 'next/server'

export async function POST(req : NextRequest) {
    try{
        await connectDB();
        const body = await req.json();
        const user = await signup(body);
        return NextResponse.json({
            message : user,
        })
    }
    catch(error : any){
         return NextResponse.json({
            message : error.message,
        })
    }
}


export async function GET(req : NextRequest){
     return NextResponse.json({
            message : "HOLA",
        })
}