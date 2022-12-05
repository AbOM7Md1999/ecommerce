import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";

function ShippingScreen() {
  const location = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('1')
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history("/payment/");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form >
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          >{console.log(address)}</Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="postal code">
          <Form.Label>Postal Code</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>

          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Link to={"/payment/"}>
          <Button type="submit" variant="primary" onClick={submitHandler}>
            Continue
          </Button>
        </Link>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
