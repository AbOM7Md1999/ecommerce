import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

function PaymentScreen() {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  useEffect(() => {
    if (!shippingAddress.address) {
      history("/shipping/");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder/");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <Form >
        <Form.Group>
          <Form.Label>Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <br />
        <Button type="submit" variant="primary"  onClick={submitHandler} >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
