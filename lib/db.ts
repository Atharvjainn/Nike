import mongoose from "mongoose"
import { MONGO_URL } from "./env"

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL!)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
