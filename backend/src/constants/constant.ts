export const GENDER = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
};

export const MIN_PASSWORD_LENGHT = 8;
export const DEFAULT_SALT_ROUNDS = 10;
export const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // in bytes
export const DEFAULT_SERVER_PORT = 5000;
export const ALLOWED_FILE_MIMETYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export enum TOKEN_TYPE {
  ACCESS_TOKEN_PRIVATE_KEY = "accessTokenPrivateKey",
  REFRESH_TOKEN_PRIVATE_KEY = "refreshTokenPrivateKey",

  ACCESS_TOKEN_PUBLIC_KEY = "accessTokenPublicKey",
  REFRESH_TOKEN_PUBLIC_KEY = "refreshTokenPublicKey",

  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export enum TIME_UNIT {
  HOUR = "hour",
  MINUTE = "minute",
  SECOND = "second",
}
