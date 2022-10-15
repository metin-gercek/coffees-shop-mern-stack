import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "utils";

const API_URL = "/api/v1/users/";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (user) => {
  try {
    const response = await axios.post(API_URL + "signin", user);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

// Update User
const updateProfile = async (user) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put(`/api/v1/users/profile`, user, {
      headers: {
        authorization: `Bearer ${userLocal.token}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("User updated successfully");
    return response.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

// Get users

const getAllUsers = async () => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.get("/api/v1/users", {
      headers: { Authorization: `Bearer ${userLocal.token}` },
    });
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

//update user

const adminUpdateUser = async (id) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.get(API_URL + id, {
      headers: { Authorization: `Bearer ${userLocal.token}` },
    });
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

const updateUser = async ({ navigate, updateData }) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.put(API_URL + updateData._id, updateData, {
      headers: { Authorization: `Bearer ${userLocal.token}` },
    });
    toast.success("User updated successfully");
    navigate("/admin/users");
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

//delete user

const adminRemoveUser = async (user) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.delete(API_URL + user._id, {
      headers: {
        authorization: `Bearer ${userLocal.token}`,
      },
    });

    toast.success("Product Deleted Successfully");
    window.location.reload();
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

//Dashboard summary for Admin
const summary = async () => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const response = await axios.put("/api/v1/orders/summary", {
      headers: {
        authorization: `Bearer ${userLocal.token}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    toast.success("User updated successfully");
  } catch (error) {
    toast.error(getError(error));
  }
};

// Logout user
const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const authService = {
  register,
  logout,
  login,
  updateProfile,
  summary,
  getAllUsers,
  adminUpdateUser,
  updateUser,
  adminRemoveUser,
};

export default authService;
