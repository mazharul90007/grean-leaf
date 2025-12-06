import jwt, {} from "jsonwebtoken";
const generateToken = (payload, secret, expiresIn) => {
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn,
    });
    return token;
};
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
export const jwtHelpers = {
    generateToken,
    verifyToken,
};
//# sourceMappingURL=jwtHelper.js.map