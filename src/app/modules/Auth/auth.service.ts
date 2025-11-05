import prisma from "../../../shared/prisma.js";
import * as bcrypt from "bcrypt";
import { jwtHelpers } from "../../../helpers/jwtHelper.js";
import jwt, { type Secret } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import config from "../../config/index.js";
import emailSender from "../../utils/emailSender.js";
import ApiError from "../../errors/ApiErrors.js";
import status from "http-status";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: Boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Login Credentials are incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret,
    config.jwt.refresh_token_expires_in
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret
    );

    console.log(decodedData);
  } catch (error) {
    throw new Error("Your are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret,
    config.jwt.expires_in
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

//====================Change Password=======================

const changePassword = async (user: any, payload: any) => {
  //Find the user
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  //checking is password is same or not
  const isCorrectPassword: Boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Login Credentials are incorrect");
  }

  //hashing new given password
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);

  //Update Password
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

//=======================Forget Password==================
const forgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_pass_secret,
    config.jwt.reset_pass_secret_expires_in
  );

  const resetPassLink =
    config.reset_pass_link + `?email=${userData.email}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `<div>
      <p>Dear User,</p>
      <p>Your password reset link 
      <a href=${resetPassLink}>
      <button>Reset Password</button>
      </a>
      </p>
    </div>`
  );
};

//====================Reset Password==============
const resetPassword = async (
  token: string,
  payload: { email: "string"; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret
  );
  if (!isValidToken) {
    throw new ApiError(status.FORBIDDEN, "Forbidden");
  }
  //hashing new given password
  const hashedPassword: string = await bcrypt.hash(payload.password, 10);

  //Update Password
  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
