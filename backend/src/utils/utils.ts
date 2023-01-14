import { CookieOptions } from "express";
import { TIME_UNIT } from "../constants/constant";

export function convertToMilliSeconds(
  time: number,
  unit: TIME_UNIT = TIME_UNIT.MINUTE
) {
  switch (unit) {
    case TIME_UNIT.SECOND:
      return time * 1000;
    case TIME_UNIT.MINUTE:
      return time * 60 * 1000;
    case TIME_UNIT.HOUR:
      return time * 60 * 60 * 1000;
    default:
      throw new Error("Unsupported unit of time");
  }
}

export function getTokenCookieOptions(
  expiry: number,
  expiryUnit: TIME_UNIT = TIME_UNIT.MINUTE
): CookieOptions {
  return {
    expires: new Date(Date.now() + convertToMilliSeconds(expiry, expiryUnit)),
    maxAge: convertToMilliSeconds(expiry, expiryUnit),
    httpOnly: true,
    sameSite: "lax",
  };
}
