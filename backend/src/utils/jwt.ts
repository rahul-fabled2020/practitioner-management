import jwt, { SignOptions } from "jsonwebtoken";
import { jwtConfig } from "../config/config";

type JWTPublicKeyType = keyof typeof jwtConfig.publicKeys;
type JWTPrivateKeyType = keyof typeof jwtConfig.privateKeys;

export const signJwt = (
  payload: Object,
  keyType: JWTPrivateKeyType,
  options: SignOptions = {}
) => {
  const privateKey = Buffer.from(
    jwtConfig.privateKeys[keyType],
    jwtConfig.encoding
  ).toString(jwtConfig.encodingOutput);

  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: jwtConfig.signingAlgorithm,
  });
};

export const verifyJwt = <T>(
  token: string,
  keyType: JWTPublicKeyType
): T | null => {
  try {
    const publicKey = Buffer.from(
      jwtConfig.publicKeys[keyType],
      jwtConfig.encoding
    ).toString(jwtConfig.encodingOutput);

    return jwt.verify(token, publicKey) as T;
  } catch (error) {
    return null;
  }
};
