import Boom from "@hapi/boom";
import { UserSchemaType } from "../models/User";
import { genSaltAndHash } from "../utils/bcrypt";

import * as userService from "./userService";
import * as sessionService from "./sessionService";
import { verifyJwt, signJwt } from "../utils/jwt";
import { TOKEN_TYPE } from "../constants/constant";
import { AUTH_MESSAGES } from "../constants/messages";
import { jwtConfig } from "../config/config";

type RegistrationDetail = UserSchemaType & {
  rePassword: string;
};

export async function signIn(loginDetail: UserSchemaType) {
  const user = await userService.findOne({ email: loginDetail.email });
  const tokens = await userService.signToken(user as UserSchemaType);

  return { user, tokens };
}

export async function signUp(registrationDetail: RegistrationDetail) {
  const hashPassword = await genSaltAndHash(registrationDetail.password);
  const { rePassword, ...user } = registrationDetail;

  return userService.create({
    ...user,
    password: hashPassword,
  } as UserSchemaType);
}

export async function signOut(user: UserSchemaType) {
  return sessionService.destroy(user._id);
}

export async function refresh(refreshToken: string) {
  const decoded = verifyJwt<{ sub: string }>(
    refreshToken,
    TOKEN_TYPE.REFRESH_TOKEN_PUBLIC_KEY
  );

  if (!decoded) {
    throw Boom.forbidden(AUTH_MESSAGES.COULD_NOT_REFRESH_TOKEN);
  }

  // Check if the user has a valid session
  const session = await sessionService.findOne({ userId: decoded.sub });
  if (!session || refreshToken !== session.refreshToken) {
    throw Boom.forbidden(AUTH_MESSAGES.COULD_NOT_REFRESH_TOKEN);
  }

  // Check if the user exist
  const user = await userService.findById(session.userId);

  if (!user) {
    throw Boom.forbidden(AUTH_MESSAGES.COULD_NOT_REFRESH_TOKEN);
  }

  // Sign new access token
  const payload = { sub: user._id, name: user.name, email: user.email };
  const acessToken = signJwt(payload, TOKEN_TYPE.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: `${jwtConfig.accessTokenExpiresIn}m`,
  });

  return acessToken;
}
