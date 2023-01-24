import { FILE_SIZE_LIMIT } from "./constant";

const MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found.`,
  LESS_THAN: (firstItem: string, secondItem: string) =>
    `${firstItem} should be less than ${secondItem}.`,
  ALREADY_EXISTS: (field: string) => `${field} already exists.`,
  INVALID_SIZE: (size: number) => `File size is greater than ${size} bytes`,
};

export const PRACTITIONER_MESSAGES = {
  NOT_FOUND: MESSAGES.NOT_FOUND("Practitioner"),
  START_DATE_LESS_THAN_END_DATE: MESSAGES.LESS_THAN("Start Time", "End Time"),
  EMAIL_ALREADY_EXISTS: MESSAGES.ALREADY_EXISTS("Email"),
};

export const FILE_UPLOAD_MESSAGES = {
  NO_FILE_UPLOADED: "No files were uploaded.",
  INVALID_TYPE:
    "Invalid file type. Only image, PDF and Excel files are allowed.",
  INVALID_SIZE: MESSAGES.INVALID_SIZE(FILE_SIZE_LIMIT),
};

export const AUTH_MESSAGES = {
  PASSWORD_MISMATCH: "Password do not match",
  NOT_FOUND: MESSAGES.NOT_FOUND("User"),
  COULD_NOT_REFRESH_TOKEN: "Could not refresh access token",
  NOT_LOGIN: "You are not logged in",
  INVALID_TOKEN: "Invalid token or user doesn't exist",
  SESSION_EXPIRED: "User session has expired",
  NO_USER_EXISTS: "User with that token no longer exist",
};

export const USER_MESSAGES = {
  EMAIL_ALREADY_EXISTS: MESSAGES.ALREADY_EXISTS("Email"),
};

export const EXCEPTION_MESSAGES = {
  UNSUPPORTED_TIME_UNIT: "Unsupported unit of time",
};
