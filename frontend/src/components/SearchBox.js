import React, { useState } from "react";
import { Button, Form,Row,Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");
  let history = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){
        history(`/?keyword=${keyword}&page=1`)
    }else{
        history(history(history.location.pathname))
    }
    console.log("1");
  };
  return (
    <div style={{ display: "inline" }}>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              className="mr-sm-2 ml-sm-5"
              
            ></Form.Control>{" "}
          </Col>{" "}
          <Col >
            <Button type="submit" variant="outline-success" className="p-2">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchBox;
