import React, {useEffect }from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import Loading from "components/Loading";
import ErrorMessageBox from "components/ErrorMessageBox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { getOrderById } from "features/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { orderDelivered } from "features/cartSlice";



const OrderPageUser = () => {
  const { orderSummary, error } = useSelector((state) => state.cart);
  const userLocal = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getOrderById(id));
    }
  }, [id, dispatch]);

  const deliverOrderHandler = (e) =>{
	e.preventDefault();
	dispatch(orderDelivered({id: orderSummary._id, navigate}))
	
  }
  return (
    <div>
      {" "}
      {orderSummary.status === "pending" ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <div>
         
          <h1 className="my-3">Order {orderSummary._id}</h1>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {orderSummary.shippingAddress?.fullName}{" "}
                    <br />
                    <strong>Address: </strong> {orderSummary.shippingAddress?.address},
                    {orderSummary.shippingAddress?.city},{" "}
                    {orderSummary.shippingAddress?.postalCode},
                    {orderSummary.shippingAddress?.country}
                  </Card.Text>
                  {orderSummary.isDelivered ? (
                    <ErrorMessageBox variant="success">
                      Delivered at {orderSummary.deliveredAt}
                    </ErrorMessageBox>
                  ) : (
                    <ErrorMessageBox variant="danger">
                      Not Delivered
                    </ErrorMessageBox>
                  )}
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method:</strong> {orderSummary.paymentMethod}
                  </Card.Text>
                  {orderSummary.isPaid ? (
                    <ErrorMessageBox variant="success">
                      Paid at {orderSummary.paidAt}
                    </ErrorMessageBox>
                  ) : (
                    <ErrorMessageBox variant="danger">Not Paid</ErrorMessageBox>
                  )}
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {orderSummary.orderItems?.map((item) => (
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
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>€{((orderSummary.totalPrice * 100) / 124).toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax (24%)</Col>
                        <Col>€{((orderSummary.totalPrice * 24) / 124).toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong> Order Total</strong>
                        </Col>
                        <Col>
                          <strong>€{orderSummary.totalPrice?.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
					{userLocal.isAdmin && orderSummary.isPaid && !orderSummary.isDelivered && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button type="button" onClick={deliverOrderHandler}>
                        Deliver Order
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default OrderPageUser;
