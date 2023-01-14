import dotenv from "dotenv";
import { CookieOptions } from "express";
import { Algorithm } from "jsonwebtoken";
import { ConnectOptions } from "mongoose";
import {
  DEFAULT_SERVER_PORT,
  FILE_SIZE_LIMIT,
  TIME_UNIT,
  TOKEN_TYPE,
} from "../constants/constant";
import { getTokenCookieOptions } from "../utils/utils";

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

type PrivateKeys = {
  [TOKEN_TYPE.ACCESS_TOKEN_PRIVATE_KEY]: string;
  [TOKEN_TYPE.REFRESH_TOKEN_PRIVATE_KEY]: string;
};

type PublicKeys = {
  [TOKEN_TYPE.ACCESS_TOKEN_PUBLIC_KEY]: string;
  [TOKEN_TYPE.REFRESH_TOKEN_PUBLIC_KEY]: string;
};

export const jwtConfig: {
  publicKeys: PublicKeys;
  privateKeys: PrivateKeys;
  encoding: BufferEncoding;
  signingAlgorithm: Algorithm;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  encodingOutput: BufferEncoding;
} = {
  encoding: "base64",
  encodingOutput: "ascii",
  signingAlgorithm: "RS256",
  privateKeys: {
    [TOKEN_TYPE.ACCESS_TOKEN_PRIVATE_KEY]:
      process.env.ACCESS_TOKEN_PRIVATE_KEY || "",
    [TOKEN_TYPE.REFRESH_TOKEN_PRIVATE_KEY]:
      process.env.REFRESH_TOKEN_PRIVATE_KEY || "",
  },
  publicKeys: {
    [TOKEN_TYPE.ACCESS_TOKEN_PUBLIC_KEY]:
      process.env.ACCESS_TOKEN_PUBLIC_KEY || "",
    [TOKEN_TYPE.REFRESH_TOKEN_PUBLIC_KEY]:
      process.env.REFRESH_TOKEN_PUBLIC_KEY || "",
  },
  accessTokenExpiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY_IN_MIN) || 15, // in minutes
  refreshTokenExpiresIn:
    Number(process.env.REFRESH_TOKEN_EXPIRY_IN_MIN) || 24 * 60, // in minutes
};

export const accessTokenCookieOptions: CookieOptions = getTokenCookieOptions(
  jwtConfig.accessTokenExpiresIn,
  TIME_UNIT.MINUTE
);

export const refreshTokenCookieOptions: CookieOptions = getTokenCookieOptions(
  jwtConfig.refreshTokenExpiresIn,
  TIME_UNIT.MINUTE
);
