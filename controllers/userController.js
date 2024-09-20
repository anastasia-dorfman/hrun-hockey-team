import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ userId: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

// export const updateUser = async (req, res) => {
//   const { userId } = req.user;
//   const obj = { ...req.body };

//   delete obj.password;
//   delete obj.role;
//   delete obj.userId;

//   try {
//     const user = await User.findOne({ userId });
//     if (!user) {
//       return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
//     }

//     Object.assign(user, obj);
//     await user.save();

//     const updatedUser = user.toJSON();

//     res
//       .status(StatusCodes.OK)
//       .json({ msg: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ msg: "Failed to update user", error: error.message });
//   }
// };

export const updateUser = async (req, res) => {
  const { userId } = req.user;
  const updateData = { ...req.body };

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    // password update
    if (updateData.password) {
      const { currentPassword, password, passwordConfirmation } =
        updateData.password;

      const isPasswordCorrect = await comparePassword(
        currentPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Current password is incorrect" });
      }

      if (password !== passwordConfirmation) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "New password and confirmation do not match" });
      }

      user.password = await hashPassword(password);
      delete updateData.password;
    }

    // Update other fields
    for (const [key, value] of Object.entries(updateData)) {
      if (key !== "role" && key !== "userId") {
        user[key] = value;
      }
    }

    await user.save();

    const updatedUser = user.toJSON();
    delete updatedUser.password;

    res
      .status(StatusCodes.OK)
      .json({ msg: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Failed to update user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const removedUser = await User.findOneAndDelete({ userId: req.user.userId });
  if (!removedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
  }
  res.status(StatusCodes.OK).json({ msg: "User deleted successfully" });
};
