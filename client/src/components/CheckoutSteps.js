import {Row, Col} from 'react-bootstrap';

const CheckoutSteps = (props) => {
  return (
	<Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment Methods</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  )
}

export default CheckoutSteps