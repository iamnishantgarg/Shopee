import React, { useEffect } from "react";
// import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserList, deleteUser } from "../actions/userActions";
const UserListScreen = ({
  getUserList,
  error,
  users,
  loading,
  userInfo,
  history,
  deleteUser,
  successDelete,
}) => {
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      getUserList();
    } else history.push("/login");
  }, [getUserList, history, successDelete]);
  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure")) {
      deleteUser(userId);
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button className="btn-sm" variant="light">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.userList.users,
  loading: state.userList.loading,
  error: state.userList.error,
  userInfo: state.userLogin.userInfo,
  successDelete: state.userDelete.success,
});

export default connect(mapStateToProps, { getUserList, deleteUser })(
  UserListScreen
);
