import jwt, { type JwtPayload, type Secret } from "jsonwebtoken";

const generateToken = (
  payload: any,
  secret: Secret,
  expiresIn: number
): string => {
  const token = jwt.sign(payload, secret as Secret, {
    algorithm: "HS256",
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
