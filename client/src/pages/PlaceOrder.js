import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Card, Col, Row, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { orderCart } from "features/cartSlice";

export default function PlaceOrderScreen() {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const itemQuantity = cartItems.reduce((a, c) => a + c.quantity, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    window.alert(`Order confirmed successfuly`);
	let isPaid = true
	let paidAt = Date.now();
    const orderedData = {
      orderItems: cartItems,
      paymentMethod: paymentMethod.paymentMethodName,
      shippingAddress,
      totalPrice,
	  isPaid,
	  paidAt
    };
    dispatch(orderCart({ orderedData, navigate }));
    localStorage.removeItem("cartItems");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping to</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {shippingAddress.fullName} <br />
                <strong>Address: </strong> {shippingAddress.address},
                {shippingAddress.city}, {shippingAddress.postalCode},
                {shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {paymentMethod.paymentMethodName}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              {itemQuantity === 1 ? (
                <Card.Title>Item</Card.Title>
              ) : (
                <Card.Title>Items</Card.Title>
              )}

              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
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
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>€{item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>€{((totalPrice * 100) / 124).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax (24%)</Col>
                    <Col>€{((totalPrice * 24) / 124).toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>€{totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    {paymentMethod.paymentMethodName === "PayPal" ? (
                      <Button
                        type="button"
                        onClick={() => {
                          window.location.href = "https://www.paypal.com/";
                        }}
                      >
                        Connect to PayPal
                      </Button>
                    ) : (
                      <div>
                        <Form onSubmit={submitHandler}>
                          <Form.Group className="mb-3" controlId="cardfullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              placeholder="Full name on card..."
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="carsnumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                              placeholder="8888-8888-8888-8888"
                              required
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="expiredate">
                            <Form.Label>Expire Date</Form.Label>
                            <Form.Control placeholder="MM/YY" required />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                              placeholder="***"
                              required
                              type="password"
                            />
                          </Form.Group>

                          <div className="mb-3">
                            <Button variant="primary" type="submit">
                              Order
                            </Button>
                          </div>
                        </Form>
                      </div>
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
}
