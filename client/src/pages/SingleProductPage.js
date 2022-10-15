import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { productFetch } from "../features/productsSlice";
import { Helmet } from "react-helmet-async";
import Rating from "components/Rating";
import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";
import { addToCart } from "features/cartSlice";

const SingleProductPage = () => {
  const dispatch = useDispatch();
  const { singleProduct, error, status } = useSelector(
    (state) => state.products
  );
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(productFetch(id));
    }
  }, [id, dispatch]);

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
  };

  return status === "pending" ? (
    <Loading />
  ) : error ? (
    <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={singleProduct?.image}
            alt={singleProduct?.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{singleProduct?.name}</title>
              </Helmet>
              <h1>{singleProduct?.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={singleProduct?.rating}
                numReviews={singleProduct?.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Pirce : €{singleProduct?.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{singleProduct?.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>€{singleProduct?.price} <Badge bg="info">incl. 24% VAT</Badge></Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {singleProduct?.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {singleProduct?.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      {singleProduct.countInStock === 0 ? (
                        <Button
                          variant="light"
                          disabled
                          onClick={() => handleAddtoCart(singleProduct)}
                        >
                          Out of stock
                        </Button>
                      ) : (
                        <Button onClick={() => handleAddtoCart(singleProduct)}>
                          Add to cart
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SingleProductPage;
