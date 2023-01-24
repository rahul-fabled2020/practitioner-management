import { CookieOptions } from "express";
import { TIME_UNIT } from "../constants/constant";

import { convertToMilliSeconds } from "./time";

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
