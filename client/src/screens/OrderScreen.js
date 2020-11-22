import React, { useState, useEffect } from "react";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "../axios";
import Message from "../components/Message";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../components/Loader";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../actions/types";
const OrderScreen = ({
  getOrderDetails,
  userInfo,
  deliverOrder,
  loadingDeliver,
  successDeliver,
  match,
  order,
  loading,
  error,
  loadingPay,
  history,
  successPay,
  payOrder,
}) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      getOrderDetails(orderId);
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    successPay,
    order,
    getOrderDetails,
    successDeliver,
    history,
    orderId,
    dispatch,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    payOrder(orderId, paymentResult);
  };
  const deliverHandler = () => {
    deliverOrder(order);
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong>Name: </strong>

                {order.user.name}
              </p>

              <p>
                {" "}
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city} ,
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on: {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x &#x20B9;{item.price} = &#x20B9;
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>&#x20B9;{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>&#x20B9;{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>&#x20B9;{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#x20B9;{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => ({
  order: state.orderDetails.order,
  loading: state.orderDetails.loading,
  userInfo: state.userLogin.userInfo,
  error: state.orderDetails.error,
  loadingPay: state.orderPay.loading,
  successPay: state.orderPay.success,
  loadingDeliver: state.orderDeliver.loading,
  successDeliver: state.orderDeliver.success,
});

export default connect(mapStateToProps, {
  getOrderDetails,
  payOrder,
  deliverOrder,
})(OrderScreen);
