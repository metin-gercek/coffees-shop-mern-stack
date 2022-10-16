import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "utils";

const API_URL = "/api/v1/products/";

//get all products
const productsFetch = async () => {
  try {
    const result = await axios.get("/api/v1/products");
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

// get one product
const productFetch = async (id) => {
  try {
    const result = await axios.get(API_URL + "product/" + id);
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

//remove product
const adminRemoveProduct = async (product) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.delete(API_URL + product._id, {
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

//admin create product
const adminCreateProduct = async ({ navigate }) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.post(
      "/api/v1/products",
      {},
      {
        headers: {
          authorization: `Bearer ${userLocal.token}`,
        },
      }
    );
    toast.success("product created successfully");
    navigate(`/admin/product/${result?.data.product._id}`);
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

// admin update product
const adminUpdateProduct = async (id) => {
  try {
    const result = await axios.get(API_URL + "product/" + id);
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

const updateProduct = async ({ navigate, updateData }) => {
  try {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const result = await axios.put(
      "/api/v1/products/" + updateData._id,
      updateData,
      {
        headers: { Authorization: `Bearer ${userLocal.token}` },
      }
    );

    navigate("/admin/products");
    return result?.data;
  } catch (error) {
    toast.error(getError(error));
  }
};

const productService = {
  productsFetch,
  productFetch,
  adminRemoveProduct,
  adminCreateProduct,
  adminUpdateProduct,
  updateProduct,
};

export default productService;
