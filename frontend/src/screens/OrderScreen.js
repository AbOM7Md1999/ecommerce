import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DETAILS_RESET,ORDER_DELIVER_RESET } from "../constants/orderConstants";
import { PayPalButton } from 'react-paypal-button-v2'

function OrderScreen() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const params = useParams();

  const [sdkReady, setSdkReady] = useState(false);

  const orderId = params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userinfo } = userLogin;


  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  }
//&buyer-country=US
  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ASUOOA6cE3EESJgujXWB0mniT2bIjaqPs8UisDHtjZu5NqBmvHi6lbUy2LvUEqMzD0mXYedX6jQsRdxR&enable-funding=paylater";
    script.async = "true";
    script.onload = () => {
      setSdkReady(true);
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if(!userinfo){
      history('/login/')
    }
    
    if (!order || successPay || order._id !== Number(orderId) || successDeliver) {
      console.log(orderId);
      const num = Number(orderId)
      dispatch({type: ORDER_PAY_RESET})
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  
  }, [dispatch, order, orderId, successPay,successDeliver]);

  //ASUOOA6cE3EESJgujXWB0mniT2bIjaqPs8UisDHtjZu5NqBmvHi6lbUy2LvUEqMzD0mXYedX6jQsRdxR

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
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
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.DeliveredAt}
                </Message>
              ) : (
                <Message variant="warning">
                  Not Delivered {order.DeliveredAt}
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                <strong>Method: </strong>

                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid {order.paidAt}</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1} xs={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="img-fluid shadow-4"
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} X ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Item</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total Price</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid &&(
              <ListGroup.Item>
                {loadingPay && <Loader/>}
                {!sdkReady ? (<Loader/>) :(
                  <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                )}
              </ListGroup.Item>

            )}


          </ListGroup>

          {loadingDeliver && <Loader/>}

          {userinfo && userinfo.isAdmin && order.isPaid && !order.isDelivered && (
            <ListGroup.Item>
              <div className="d-grid gap-2">
              <Button type="button" onClick={deliverHandler}>
                Mark as Delivered
              </Button>
              </div>
            </ListGroup.Item>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
