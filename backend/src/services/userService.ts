import { FilterQuery, QueryOptions } from "mongoose";

import { signJwt } from "../utils/jwt";
import { User, UserSchemaType } from "../models/User";
import { TIME_UNIT, TOKEN_TYPE } from "../constants/constant";
import { jwtConfig } from "../config/config";
import { Session } from "../models/Session";
import * as sessionService from "../services/sessionService";

export function create(user: UserSchemaType) {
  return User.create(user);
}

export function findById(id: string) {
  return User.findById(id);
}

export function findOne(
  query: FilterQuery<UserSchemaType>,
  options: QueryOptions = {}
) {
  return User.findOne(query, {}, options);
}

export const signToken = async (user: UserSchemaType) => {
  // Sign the access token
  const payload = { sub: user._id, name: user.name, email: user.email };
  const accessToken = signJwt(payload, TOKEN_TYPE.ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: `${jwtConfig.accessTokenExpiresIn}m`,
  });

  // Sign the refresh token
  const refreshToken = signJwt(payload, TOKEN_TYPE.REFRESH_TOKEN_PRIVATE_KEY, {
    expiresIn: `${jwtConfig.refreshTokenExpiresIn}m`,
  });

  // Create a Session
  const session = await sessionService.create(user._id, refreshToken);

  // Return access token
  return { accessToken, refreshToken };
};
