import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getError } from "utils";
import productService from "./Services/productService";

const initialState = {
  products: [],
  error: null,
  status: "",
  singleProduct: [],
  updatedProductData: [],
  updateData: [],
};

//get all products
export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      return await productService.productsFetch();
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

// get one product
export const productFetch = createAsyncThunk(
  "product/productFetch",
  async (id) => {
    try {
      return await productService.productFetch(id);
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

//remove product
export const adminRemoveProduct = createAsyncThunk(
  "product/deleteProduct",
  async (product) => {
    try {
      return await productService.adminRemoveProduct(product);
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

//admin create product
export const adminCreateProduct = createAsyncThunk(
  "product/createProduct",
  async ({ navigate }) => {
    if (window.confirm("Are you sure to create?")) {
      try {
        return await productService.adminCreateProduct({ navigate });
      } catch (error) {
        toast.error(getError(error));
      }
    }
  }
);

// admin update product
export const adminUpdateProduct = createAsyncThunk(
  "product/adminUpdateProduct",
  async (id) => {
    try {
      return await productService.adminUpdateProduct(id);
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ navigate, updateData }) => {
    try {
      return await productService.updateProduct({ navigate, updateData });
    } catch (error) {
      toast.error(getError(error));
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(adminCreateProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminCreateProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.singleProduct = action.payload;
      })
      .addCase(adminCreateProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(productFetch.pending, (state) => {
        state.status = "pending";
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.status = "success";
        state.singleProduct = action.payload;
      })
      .addCase(productFetch.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      })
      .addCase(adminUpdateProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminUpdateProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.updatedProductData = action.payload;
      })
      .addCase(adminUpdateProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = "Data not loaded!!!";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.updatedProductData = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(adminRemoveProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(adminRemoveProduct.fulfilled, (state, action) => {
        state.status = "success";

        state.products = state.products.filter(
          (item) => item._id !== action.payload.data
        );
      })
      .addCase(adminRemoveProduct.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export default productsSlice.reducer;
