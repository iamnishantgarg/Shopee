import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { connect } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import * as actionTypes from "../actions/types";
import { useDispatch } from "react-redux";
const UserEditScreen = ({
  getUserDetails,
  match,
  history,
  loading,
  error,
  user,
  updateUser,
  loadingUpdate,
  errorUpdate,
  successUpdate,
}) => {
  const dispatch = useDispatch();
  const userId = match.params.id;
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: actionTypes.USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        getUserDetails(userId);
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, dispatch, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser({ _id: userId, name, email, isAdmin });
  };
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate ? (
          <Loader />
        ) : (
          errorUpdate && <Message variant="danger">{errorUpdate}</Message>
        )}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                value={isAdmin}
                label="isAdmin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.userDetails.loading,
  error: state.userDetails.error,
  user: state.userDetails.user,
  loadingUpdate: state.userUpdate.loading,
  errorUpdate: state.userUpdate.error,
  successUpdate: state.userUpdate.success,
});

export default connect(mapStateToProps, { getUserDetails, updateUser })(
  UserEditScreen
);
