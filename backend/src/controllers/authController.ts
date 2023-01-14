import { Request, Response, NextFunction } from "express";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/config";
import { TOKEN_TYPE } from "../constants/constant";

import * as authService from "../services/authService";

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { user, tokens } = await authService.signIn(req.body);
    const { accessToken, refreshToken } = tokens;

    res.cookie(TOKEN_TYPE.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
    res.cookie(
      TOKEN_TYPE.REFRESH_TOKEN,
      refreshToken,
      refreshTokenCookieOptions
    );
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    res.locals.user = user;

    return res.json({ data: { accessToken } });
  } catch (error) {
    next(error);
  }
}

export function signUp(req: Request, res: Response, next: NextFunction) {
  authService
    .signUp(req.body)
    .then((data) => res.json({ data }))
    .catch((err) => next(err));
}

export async function signOut(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await authService.signOut(res.locals.user);

    res.cookie(TOKEN_TYPE.ACCESS_TOKEN, "", { maxAge: 1 });
    res.cookie(TOKEN_TYPE.REFRESH_TOKEN, "", { maxAge: 1 });
    res.cookie("logged_in", "", {
      maxAge: 1,
    });

    return res.json({ data });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = await authService.refresh(
      req.cookies[TOKEN_TYPE.REFRESH_TOKEN]
    );

    // Send the access token as cookie
    res.cookie(TOKEN_TYPE.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.json({ data: { accessToken } });
  } catch (error) {
    next(error);
  }
}
