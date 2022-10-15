import { Helmet } from "react-helmet-async";
import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "features/cartSlice";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { paymentMethod } = useSelector((state) => state.cart);

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod.paymentMethodName || "PayPal"
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethodName: paymentMethodName }));
    navigate("/placeorder");
  };
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>

      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Payment</h1>

        <Form onSubmit={submitHandler}>
		<div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="CreditCard"
              label="CreditCard"
              value="CreditCard"
              checked={paymentMethodName === 'CreditCard'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Payment;
