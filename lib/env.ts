export const MONGO_URL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) throw new Error("JWT_SECRET is Not Defined");
