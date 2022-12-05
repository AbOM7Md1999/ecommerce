import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/loader";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

function ProductEditScreen() {
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;


  const productUpdate = useSelector((state) => state.productUpdate);
  const { error: errorUpdate, loading:loadingUpdate, success: successUpdate } = productUpdate;


  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);



  const params = useParams();
  const productId = params.id;
  const [message, setMessage] = useState("");

  const history = useNavigate();

  useEffect(() => {

    if(successUpdate){
        dispatch({type: PRODUCT_UPDATE_RESET})
        console.log('2');
        history(`/admin/productlist/`)
    }else{
        if (!product.name || product._id !== Number(productId)) {
            dispatch(listProductDetails(productId));
          } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setDescription(product.description);
            setCategory(product.category);
            setCountInStock(product.countInStock);
    
    
          }

    }

      
    
  }, [dispatch,product,productId,history,successUpdate]);

  const submitHandler = (e) => {
    console.log('1');
    e.preventDefault();
    console.log('brand: ', brand);
    dispatch(updateProduct({_id:product._id,name,price,image,brand,category,countInStock,description}))
    console.log('brand: ', brand);

  };


  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()

    
    formData.append('image',file)
    formData.append('product_id',productId)

    setUploading(true)
    try{
      const config = {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      }

      const data = await axios.put('/api/products/upload/',formData,config)
      setImage(data)
      setUploading(false)
      console.log(image);
    }catch{
      setUploading(false)
    }
  }

  return (
    <div>
      <Link to="/admin/productlist/">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}




        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="name"
                placeholder="enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />


            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control type="file" label='Choose File' onChange={uploadFileHandler}></Form.Control>
              {uploading && <Loader />}
            </Form.Group>
            <br />

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <Form.Group controlId="countinstock">
              <Form.Label>CountInStock</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />


            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
