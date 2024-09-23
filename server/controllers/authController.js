import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import { USER_STATUSES } from "../utils/constants.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // const isValidUser =
  //   user && (await comparePassword(req.body.password, user.password));

  // if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  if (user.status === USER_STATUSES.DELETED) {
    return res.status(StatusCodes.FORBIDDEN).json({
      msg: "This account has been deleted. Please contact support to restore your account.",
      isDeleted: true,
    });
  }

  const isValidPassword = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const token = createJWT({ userId: user.userId, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const restoreAccount = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new NotFoundError("No user found with this email address");
  }

  if (user.status !== USER_STATUSES.DELETED) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "This account is not deleted and does not need restoration",
    });
  }

  user.status = "Active";
  await user.save();

  res.status(StatusCodes.OK).json({
    msg: "Account restored successfully. You can now log in.",
  });
};
