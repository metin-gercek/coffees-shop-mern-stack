import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import ErrorMessageBox from "../components/ErrorMessageBox";
import { Link, useNavigate } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
  clearAllCart,
} from "features/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const decreaseCartHandler = (cartItems) => {
    dispatch(decreaseCart(cartItems));
  };
  const increaseCartHandler = (cartItems) => {
    dispatch(increaseCart(cartItems));
  };
  const removeItemHandler = (cartItems) => {
    dispatch(removeFromCart(cartItems));
  };
  const clearAllCartHAndler = (cartItems) => {
    dispatch(clearAllCart(cartItems));
  };

  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <ErrorMessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </ErrorMessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item._id}`}>
                        {item.name.slice(0, 21)}...
                      </Link>
                    </Col>

                    <Col md={3}>
                      <Button
                        onClick={() => decreaseCartHandler(item)}
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() => increaseCartHandler(item)}
                        disabled={item.quantity >= item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>€{item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <Button
            className="mt-2"
            type="button"
            onClick={() => clearAllCartHAndler()}
            variant="primary"
            disabled={cartItems.length === 0}
          >
            Clear All Cart
          </Button>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : €
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {user?.isBanned ? (
                      <Button
					  type="button"
					  variant="primary"
                        disabled
                      >
                        Sorry! You're banned!
                      </Button>
                    ) : (
						<Button
						type="button"
						variant="primary"
						disabled={cartItems.length === 0}
						onClick={checkOutHandler}
					  >
						Proceed to Checkout
					  </Button>
                    )}
                
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
