//import  {NotFoundError}  from "../helpers/apiError.js";
import User from "../models/userModel.js";

// PUT profile update
const updateProfile = async (user) => {
  return user.save();
};

//GET admin get all users
const getAllUsers = async () => {
  return User.find({});
};

// GET admin get user by id
const getUserById = async (id) => {
  return User.findById(id);
};

// GET findOne user //POST user signin
const signinUser = async (email) => {
  return User.findOne(email);
};
export default {
  updateProfile,
  getAllUsers,
  getUserById,
  signinUser,
};
