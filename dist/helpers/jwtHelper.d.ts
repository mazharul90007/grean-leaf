import { type JwtPayload, type Secret } from "jsonwebtoken";
export declare const jwtHelpers: {
    generateToken: (payload: any, secret: Secret, expiresIn: number) => string;
    verifyToken: (token: string, secret: Secret) => JwtPayload;
};
//# sourceMappingURL=jwtHelper.d.ts.map