import { Link, useLocation } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


const Signin = () => {
  const { search } = useLocation();
  const dispatch = useDispatch();

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);
  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  useEffect(() => {
    if (isError) {
		toast.error(message)
		
    } else if (user) {
      navigate(redirect);
    }

    dispatch(reset());
  }, [user, isError, navigate, dispatch, redirect, message]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Signin;
