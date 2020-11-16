import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listOrders } from "../actions/orderActions";
const OrderListScreen = ({
  listOrders,
  error,
  orders,
  loading,
  userInfo,
  history,
}) => {
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      listOrders();
    } else history.push("/login");
    //eslint-disable-next-line
  }, [listOrders, history]);
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td> &#x20B9; {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
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
  orders: state.orderList.orders,
  loading: state.orderList.loading,
  error: state.orderList.error,
  userInfo: state.userLogin.userInfo,
});

export default connect(mapStateToProps, { listOrders })(OrderListScreen);
