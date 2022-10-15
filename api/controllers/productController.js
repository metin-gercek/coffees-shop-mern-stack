import { BadRequestError } from "../helpers/apiError.js";
import Product from "../models/productModel.js";
import productService from "../services/productService.js";

const PAGE_SIZE = 9;
// POST product
export const createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
    });
    const product = await productService.createProduct(newProduct);
    res.send({ message: "Product Created", product });
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//PUT update product
export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await productService.updateProduct(product);
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

// DELETE delete product
export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).end();
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//GET admin
export const getAdminProduct = async (req, res, next) => {
  try {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//GET search
export const searchProducts = async (req, res, next) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
};

//GET categories

export const getCategories = async (req, res, next) => {
 try {
	const categories = await Product.find().distinct("category");
    res.send(categories);
 } catch (error) {
	if (error && error.name == "ValidationError") {
		next(new BadRequestError("Invalid Request", 400, error));
	  } else {
		next(error);
	  }
 }
}

//GET get one product
export const getProductById = async (req, res, next) => {
  try {
    //const product = await Product.findById(req.params.id);
    res.status(200).send(await productService.getProductById(req.params.id));
  } catch (error) {
    if (error && error.name == "ValidationError") {
      next(new BadRequestError("Invalid Request", 400, error));
    } else {
      next(error);
    }
  }
};

//GET get all products
export const getAllProducts = async (req, res, next) => {
	try {
		const products = await productService.getAllProducts()
		res.json(products);
	} catch (error) {
		if (error && error.name == "ValidationError") {
			next(new BadRequestError("Invalid Request", 400, error));
		  } else {
			next(error);
		  }
	}
}
