import React, {  useState } from 'react';
import { updateProfile } from "../features/authSlice";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';
import {Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";



const ProfilePage = () => {
	const userInfo = useSelector((state) => state.auth.user)
	const [name, setName] = useState(userInfo?.name);
	const [email, setEmail] = useState(userInfo?.email);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const dispatch = useDispatch();


	const submitHandler = (e) => {
		e.preventDefault();
		if(password !== confirmPassword) {
			toast.error('Passwords does not match')
			return
		}
		const user = {
			name,
			email,
			password,
		  };
		  
		dispatch(updateProfile(user));
		}

  return (
	<div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  )
}

export default ProfilePage