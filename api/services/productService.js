import  {NotFoundError}  from "../helpers/apiError.js";
import Product from "../models/productModel.js";


//POST product

const createProduct = async (product) => {
  return product.save();
};

//PUT update product

const updateProduct = async (product) => {
  return product.save();
};

//DELETE delete product
const deleteProduct = async (id) => {
  const foundProduct = Product.findByIdAndDelete(id);
  if (!foundProduct) {
    throw new NotFoundError(`Product ${id} not found`);
  }
  return foundProduct;
};

//GET get one product
const getProductById = async (id) => {
	const foundProduct = Product.findById(id)
	if (!foundProduct) {
		throw new NotFoundError(`Product ${id} not found`)
	  }
	  return foundProduct
}

//GET get all products
const getAllProducts = async () =>  {
	return Product.find()
}

export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts
};
