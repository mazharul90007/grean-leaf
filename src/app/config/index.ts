import dotenv from "dotenv";
import type { Secret } from "jsonwebtoken";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET as Secret,
    expires_in: process.env.EXPIRES_IN as string,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as Secret,
    refresh_token_expires_in: process.env
      .REFRESH_TOKEN_SECRET_EXPIRES_IN as string,
    reset_pass_secret: process.env.RESET_PASS_TOKEN as Secret,
    reset_pass_secret_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
  },
  reset_pass_link: process.env.RESET_PASS_LINK,
  emailSender: {
    email: process.env.EMAIL,
    app_pass: process.env.APP_PASS,
  },
};
