import dotenv from "dotenv";
import { ConnectOptions } from "mongoose";
import { DEFAULT_SERVER_PORT, FILE_SIZE_LIMIT } from "../constants/constant";

dotenv.config();

export const applicationConfig = {
  serverPort: process.env.PORT || DEFAULT_SERVER_PORT,
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
};

export const expressFileUploadConfig = {
  abortOnLimit: true,
  useTempFiles: true,
  limits: {
    fileSize: FILE_SIZE_LIMIT,
  },
};

export const cloudinaryConfig = {
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}; // cloudinary requires it in snake case

export const mongooseConfig = {
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  connectionUrl: process.env.MONGO_DB_CONNECTION_URL,
};
