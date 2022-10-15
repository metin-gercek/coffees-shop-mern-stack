import { BadRequestError } from "../helpers/apiError.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import userService from "../services/userService.js";

// PUT profile update
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await userService.updateProfile(user);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isBanned: user.isBanned,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//GET admin get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

// GET admin get user by id
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//PUT admin update user
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      user.isBanned = Boolean(req.body.isBanned);
      const updatedUser = await user.save();
      res.send({ message: "User Updated", user: updatedUser });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//POST user signin
export const signinUser = async (req, res, next) => {
  try {
    const user = await userService.signinUser({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isBanned: user.isBanned,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//DELETE admin delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      if (user.email === "admin@gmail.com") {
        res.status(400).send({ message: "Can Not Delete Admin User" });
        return;
      }
      await user.remove();
      res.send({ message: "User Deleted" });
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

// POST user signup
export const userSignup = async (req, res, next) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      token: generateToken(user),
    });
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};
