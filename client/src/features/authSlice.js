import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getError } from "utils";

import authService from "./Services/authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  users: [],
  updatedUserData: [],
};

// Register user
export const register = createAsyncThunk("auth/signup", async (user) => {
  try {
    return await authService.register(user);
  } catch (error) {
    toast.error(getError(error));
  }
});

// Login user
export const login = createAsyncThunk("auth/login", async (user) => {
  try {
    return await authService.login(user);
  } catch (error) {
    toast.error(getError(error));
  }
});

//Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  
});

// Update User
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (user) => {
    try {
      return await authService.updateProfile(user);
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

//Get Users
export const getAllUsers = createAsyncThunk("users/usersFetch", async () => {
  try {
    return await authService.getAllUsers();
  } catch (error) {
    toast.error(getError(error));
  }
});

//update user
export const adminUpdateUser = createAsyncThunk(
  "user/adminUpdateUser",
  async (id) => {
    try {
      return await authService.adminUpdateUser(id);
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ navigate, updateData }) => {
    try {
      return await authService.updateUser({ navigate, updateData });
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

// delete user

export const adminRemoveUser = createAsyncThunk(
  "user/deleteUser",
  async (user) => {
    try {
      return await authService.adminRemoveUser(user);
    } catch (err) {
      toast.error(getError(err));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = null;
      })
      .addCase(adminUpdateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminUpdateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.updatedUserData = action.payload;
      })
      .addCase(adminUpdateUser.rejected, (state, action) => {
        state.status = "rejected";
        state.isError = "Data not loaded!!!";
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.updatedUserData = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(adminRemoveUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminRemoveUser.fulfilled, (state, action) => {
        state.status = "success";

        state.users = state.users.filter(
          (user) => user._id !== action.payload.data
        );
      })
      .addCase(adminRemoveUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
