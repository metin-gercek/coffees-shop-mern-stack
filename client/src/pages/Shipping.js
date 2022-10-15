import React, {  useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {Form, Button} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from 'features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { shippingAddress } = useSelector((state) => state.cart);
	const { user} = useSelector((state) => state.auth);

	const [fullName, setFullName] = useState(shippingAddress?.fullName || '')
	const [address, setAddress] = useState(shippingAddress?.address ||'')
	const [city, setCity] = useState(shippingAddress?.city ||'')
	const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ||'')
	const [country, setCountry] = useState(shippingAddress?.country ||'')

	useEffect(() => {
		if (!user) {
		  navigate('/signin?redirect=/shipping');
		}
	  }, [user, navigate]);


	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(saveShippingAddress({fullName: fullName, address: address, city: city, postalCode: postalCode, country:country}))
		navigate('/payment')
	}


  return (
	<div>
	<Helmet>
	  <title>Shipping Address</title>
	</Helmet>

	<CheckoutSteps step1 step2></CheckoutSteps>
	<div className="container small-container">
	  <h1 className="my-3">Shipping Address</h1>
	  <Form onSubmit={submitHandler}>
		<Form.Group className="mb-3" controlId="fullName">
		  <Form.Label>Full Name</Form.Label>
		  <Form.Control
			value={fullName}
			onChange={(e) => setFullName(e.target.value)}
			required
		  />
		</Form.Group>
		<Form.Group className="mb-3" controlId="address">
		  <Form.Label>Address</Form.Label>
		  <Form.Control
			value={address}
			onChange={(e) => setAddress(e.target.value)}
			required
		  />
		</Form.Group>
		<Form.Group className="mb-3" controlId="city">
		  <Form.Label>City</Form.Label>
		  <Form.Control
			value={city}
			onChange={(e) => setCity(e.target.value)}
			required
		  />
		</Form.Group>
		<Form.Group className="mb-3" controlId="postalCode">
		  <Form.Label>Postal Code</Form.Label>
		  <Form.Control
			value={postalCode}
			onChange={(e) => setPostalCode(e.target.value)}
			required
		  />
		</Form.Group>
		<Form.Group className="mb-3" controlId="country">
		  <Form.Label>Country</Form.Label>
		  <Form.Control
			value={country}
			onChange={(e) => setCountry(e.target.value)}
			required
		  />
		</Form.Group>
		<div className="mb-3">
		  <Button variant="primary" type="submit">
			Continue
		  </Button>
		</div>
	  </Form>
	</div>
  </div>
  )
}

export default Shipping