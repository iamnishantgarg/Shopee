import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
const PaymentScreen = ({
  userInfo,
  history,
  savePaymentMethod,
  shippingAddress,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    history.push("/placeorder");
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect?=shipping");
    }
    if (!shippingAddress) history.push("/shipping");
  }, [history, userInfo, shippingAddress]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.userLogin.userInfo,
  shippingAddress: state.cart.shippingAddress,
});
export default connect(mapStateToProps, { savePaymentMethod })(PaymentScreen);
