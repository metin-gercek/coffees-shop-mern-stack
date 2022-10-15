import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import ErrorMessageBox from "../components/ErrorMessageBox";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { adminUpdateUser, updateUser } from "features/authSlice";

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams(); // /product/:id
  const { id: userId } = params;
  const { updatedUserData, isError, isLoading } = useSelector(
    (state) => state.auth
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
 

  useEffect(() => {
    setName(updatedUserData.name);
    setEmail(updatedUserData.email);
    setIsAdmin(updatedUserData.isAdmin);
    setIsBanned(updatedUserData.isBanned);
    

    dispatch(adminUpdateUser(userId));
  }, [
    userId,
    dispatch,
	updatedUserData.name,
	updatedUserData.email,
	updatedUserData.isAdmin,
	updatedUserData.isBanned
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updateData = {
      _id: userId,
      name,
      email,
      isAdmin,
      isBanned,
     
    };
    dispatch(updateUser({ navigate, updateData }));
  };
  return (
	<Container className="small-container">
      <Helmet>
        <title>Edit User ${userId}</title>
      </Helmet>
      <h1>Edit User {userId}</h1>

      {isLoading ? (
        <Loading></Loading>
      ) : isError ? (
        <ErrorMessageBox variant="danger">{isError}</ErrorMessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
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
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isBanned"
            label="isBanned"
            checked={isBanned}
            onChange={(e) => setIsBanned(e.target.checked)}
          />

          <div className="mb-3">
            <Button type="submit">
              Update
            </Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default UserEdit;
