import express from "express";
import { isAuth, isAdmin } from "../utils.js";
import {
  updateProfile,
  getAllUsers,
  getUserById,
  updateUser,
  signinUser,
  deleteUser,
  userSignup,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.put("/profile", isAuth, updateProfile);
userRouter.get("/", isAuth, isAdmin, getAllUsers);
userRouter.get("/:id", isAuth, isAdmin, getUserById);
userRouter.put("/:id", isAuth, isAdmin, updateUser);
userRouter.post("/signin", signinUser);
userRouter.delete("/:id", isAuth, isAdmin, deleteUser);
userRouter.post("/signup", userSignup);

export default userRouter;
