import express from "express";
import { isAuth, isAdmin } from "../utils.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminProduct,
  searchProducts,
  getCategories,
  getProductById,
  getAllProducts,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/", isAuth, isAdmin, createProduct);
productRouter.put("/:id", isAuth, isAdmin, updateProduct);
productRouter.delete("/:id", isAuth, isAdmin, deleteProduct);
productRouter.get("/admin", isAuth, isAdmin, getAdminProduct);
productRouter.get("/search", searchProducts);
productRouter.get("/categories", getCategories);
productRouter.get("/product/:id", getProductById);
productRouter.get("/", getAllProducts);

export default productRouter;
