import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import ErrorMessageBox from "../components/ErrorMessageBox";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateProduct, updateProduct } from "features/productsSlice";


const ProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams(); // /product/:id
  const { id: productId } = params;
  const { updatedProductData, error, status } = useSelector(
    (state) => state.products
  );
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(updatedProductData.name);
    setSlug(updatedProductData.slug);
    setPrice(updatedProductData.price);
    setImage(updatedProductData.image);
    setCategory(updatedProductData.category);
    setCountInStock(updatedProductData.countInStock);
    setBrand(updatedProductData.brand);
    setDescription(updatedProductData.description);

    dispatch(adminUpdateProduct(productId));
  }, [productId, dispatch,updatedProductData.slug,updatedProductData.price,updatedProductData.image,updatedProductData.category,updatedProductData.countInStock, updatedProductData.brand, updatedProductData.description,updatedProductData.name]);


  const submitHandler = async (e) => {
    e.preventDefault();
	const updateData = {
		_id: productId,
		name,
		slug,
		price,
		image,
		category,
		brand,
		countInStock,
		description,
	  }
	dispatch(updateProduct({ navigate, updateData }))
    
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Product {productId}</title>
      </Helmet>

      {status === "pending" ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
			  as="textarea"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default ProductEdit;
