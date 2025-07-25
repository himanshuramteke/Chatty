import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5001;

export const MONGODB_URI = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET;

export const NODE_ENV = process.env.NODE_ENV;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;

export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
