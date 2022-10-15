import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "utils";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : {
        paymentMethodName: "",
        creditCard: {},
      },

  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},

  ordersSummary: localStorage.getItem("ordersSummary")
    ? JSON.parse(localStorage.getItem("ordersSummary"))
    : {},

  orderSummary: {},
  error: null,
  myOrders: [],
  orders: [],
  summary: {
	users: [],
	orders: [],
	dailyOrders: [],
	productCategories: [],
	
  },
};

export const orderCart = createAsyncThunk(
  "cart/orderCart",
  async ({ orderedData, navigate }) => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    try {
      const result = await axios.post("/api/v1/orders", orderedData, {
        headers: {
          authorization: `Bearer ${userLocal.token}`,
        },
      });
      navigate(`/order/${result?.data.order._id}`);
      window.location.reload();

      return result?.data;
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

export const getOrderById = createAsyncThunk("order/:id", async (id) => {
  const userLocal = JSON.parse(localStorage.getItem("user"));

  try {
    const result = await axios.get(`/api/v1/orders/${id}`, {
      headers: { authorization: `Bearer ${userLocal.token}` },
    });
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
});

export const orderDelivered = createAsyncThunk(
  "order/:id/delivered",
  async ({ id, navigate }) => {
    const userLocal = JSON.parse(localStorage.getItem("user"));

    try {
      const result = await axios.put(
        `/api/v1/orders/${id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userLocal.token}` },
        }
      );
      navigate(`/admin/orders`);
      return result?.data;
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

export const adminOrderDelete = createAsyncThunk(
  "order/delete",
  async (order) => {
    try {
      const userLocal = JSON.parse(localStorage.getItem("user"));

      const result = await axios.delete(`/api/v1/orders/${order._id}`, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      toast.success("order deleted successfully");
      window.location.reload();
      return result?.data;
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

export const getMyOrders = createAsyncThunk("order/mine", async () => {
  const userLocal = JSON.parse(localStorage.getItem("user"));

  try {
    const result = await axios.get(`/api/v1/orders/mine`, {
      headers: { Authorization: `Bearer ${userLocal.token}` },
    });
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
});

export const getAllOrdersAdmin = createAsyncThunk("admin/orders", async () => {
  const userLocal = JSON.parse(localStorage.getItem("user"));
  try {
    const result = await axios.get(`/api/v1/orders`, {
      headers: { Authorization: `Bearer ${userLocal.token}` },
    });
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
});

export const getDashboardSummary = createAsyncThunk(
  "admin/dashboard",
  async () => {
    const userLocal = JSON.parse(localStorage.getItem("user"));

    try {
      const result = await axios.get(`/api/v1/orders/summary`, {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      });
      return result?.data;

    } catch (error) {
      toast.error(getError(error));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity >= 1) {
        state.cartItems[itemIndex].quantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const newCartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload._id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearAllCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    deleteShippingAddress(state, action) {
      state.shippingAddress = {};
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(orderCart.fulfilled, (state, action) => {
        state.status = "success";
        state.orderSummary = action.payload;
      })
      .addCase(orderCart.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(getMyOrders.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(getDashboardSummary.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.status = "success";
        state.summary.users = action.payload.users;
        state.summary.orders = action.payload.orders;
        state.summary.dailyOrders = action.payload.dailyOrders;
        state.summary.productCategories = action.payload.productCategories;
      })
      .addCase(getDashboardSummary.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(getAllOrdersAdmin.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload;
      })
      .addCase(getAllOrdersAdmin.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(adminOrderDelete.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminOrderDelete.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload.data
        );
      })
      .addCase(adminOrderDelete.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(getOrderById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = "success";
        state.orderSummary = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(orderDelivered.pending, (state) => {
        state.status = "pending";
      })
      .addCase(orderDelivered.fulfilled, (state, action) => {
        state.status = "success";
        state.orderSummary = action.payload;
      })
      .addCase(orderDelivered.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      });
  },
});

export const {
  addToCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
  clearAllCart,
  saveShippingAddress,
  deleteShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
