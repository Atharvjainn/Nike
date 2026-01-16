import { betterAuth } from "better-auth";
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import { MongoClient } from "mongodb";
import { MONGO_URL } from "./env";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(MONGO_URL!)
const db = client.db();

export const auth = betterAuth({
    database : mongodbAdapter(db,{
        client
    }),
    emailAndPassword : {
        enabled : true,
    },
    socialProviders : {
        github : {
            clientId : process.env.GITHUB_CLIENT_ID as string,
            clientSecret : process.env.GITHUB_CLIENT_SECRET as string ,
        },
        google : {
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    plugins : [nextCookies()],
    experimental : {joins : true}
})