import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Declare global namespace to extend globalThis
declare global {
  var mongoose: MongooseCache | undefined; // Use var instead of let
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI environment variable inside .env.local"
  );
}

let cached: MongooseCache = (global as any).mongoose || {
  conn: null,
  promise: null,
};

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.promise = mongoose.connect(MONGODB_URI!);
  cached.conn = await cached.promise;
  return cached.conn;
}
