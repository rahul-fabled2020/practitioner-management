import Boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";

import { AUTH_MESSAGES } from "../constants/messages";
import { compare as comparePassword } from "../utils/bcrypt";
import { findOne as findUser } from "../services/userService";
import { findOne as findSession } from "../services/sessionService";
import { verifyJwt } from "../utils/jwt";
import { TOKEN_TYPE } from "../constants/constant";

export async function validateCredential(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) {
      throw Boom.unauthorized(AUTH_MESSAGES.NOT_FOUND);
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );

    if (isPasswordCorrect) {
      next();
    }
  } catch (error) {
    next(error);
  }
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the token
    let accessToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      accessToken = req.headers.authorization.split(" ")[1];
    } else if (req.cookies[TOKEN_TYPE.ACCESS_TOKEN]) {
      accessToken = req.cookies[TOKEN_TYPE.ACCESS_TOKEN];
    }

    if (!accessToken) {
      return next(Boom.unauthorized(AUTH_MESSAGES.NOT_LOGIN));
    }

    // Validate Access Token
    const decoded = verifyJwt<{ sub: string }>(
      accessToken,
      TOKEN_TYPE.ACCESS_TOKEN_PUBLIC_KEY
    );

    if (!decoded) {
      return next(Boom.unauthorized(AUTH_MESSAGES.INVALID_TOKEN));
    }

    // Check if user has a valid session
    const session = await findSession({ userId: decoded.sub });

    if (!session) {
      return next(Boom.unauthorized(AUTH_MESSAGES.SESSION_EXPIRED));
    }

    // Check if user still exist
    const user = await findUser({ _id: session.userId });

    if (!user) {
      return next(Boom.unauthorized(AUTH_MESSAGES.NO_USER_EXISTS));
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
}
