import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import { DEFAULT_SALT_ROUNDS } from "../constants/constant";
import { AUTH_MESSAGES } from "../constants/messages";

export function genSalt(
  numerOfRounds: number = DEFAULT_SALT_ROUNDS
): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(numerOfRounds, function (err, salt) {
      if (err) {
        reject(err);
      } else {
        resolve(salt);
      }
    });
  });
}

export function genHash(salt: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, function (err: any, hash: string) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

export async function genSaltAndHash(
  password: string,
  numerOfRounds: number = DEFAULT_SALT_ROUNDS
) {
  try {
    const salt: string = await genSalt(numerOfRounds);
    const hash: string = await genHash(salt, password);

    return hash;
  } catch (error: any) {
    throw Boom.boomify(error);
  }
}

export async function compare(password: string, hash: string) {
  try {
    const isMatch = await bcrypt.compare(password, hash);

    if (isMatch) {
      return true;
    }

    throw Boom.unauthorized(AUTH_MESSAGES.PASSWORD_MISMATCH);
  } catch (error: any) {
    throw Boom.boomify(error);
  }
}
