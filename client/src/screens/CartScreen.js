import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
// import Loader from "../components/Loader";

const CartScreen = ({
  cartItems,
  addItem,
  match,
  userInfo,
  location,
  history,
  removeItem,
}) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  useEffect(() => {
    if (productId) {
      addItem(productId, qty);
      history.push("/cart");
    }
  }, [addItem, productId, qty, history]);
  const removeFromCartHandler = (id) => {
    removeItem(id);
  };
  const checkoutHandler = () => {
    if (!userInfo) history.push("/login?redirect=shipping");
    else history.push("/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>&#x20B9;{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addItem(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal(
                {cartItems.reduce((acc, item) => (acc = acc + item.qty), 0)})
                items
              </h2>
              &#x20B9;
              {cartItems
                .reduce((acc, item) => (acc = acc + item.qty * item.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  userInfo: state.userLogin.userInfo,
});

export default connect(mapStateToProps, { addItem, removeItem })(CartScreen);
