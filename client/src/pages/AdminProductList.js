import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { Button, Row, Col } from "react-bootstrap";
import {
  adminRemoveProduct,
  adminCreateProduct,
  productsFetch,
} from "../features/productsSlice";
import { useNavigate } from "react-router-dom";

const AdminProductList = () => {
  const { products, error, status } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productsFetch());
  }, [dispatch]);

  const handleDelete = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(adminRemoveProduct(product));
    }
  };
  const createHandler = () => {
    dispatch(adminCreateProduct({ navigate }));
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>
      {status === "pending" ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>IN STOCK</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>€ {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      <i className="fas fa-wrench"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => handleDelete(product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminProductList;
