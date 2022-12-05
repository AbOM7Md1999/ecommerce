import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/loader'
import FormContainer from '../components/FormContainer'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { useNavigate, useLocation } from "react-router-dom";


function LoginScreen() {

    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const location = useLocation();
    const history = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : '/';
    const userLogin = useSelector(state => state.userLogin)
    const {error,loading,userinfo} = userLogin

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }


    useEffect(() =>{
        if(userinfo){
            history(redirect)
        }



    },[history,userinfo,redirect])


  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error ? <Message variant='danger'>{error}</Message> :
      loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>
                Email Address
            </Form.Label>

            <Form.Control type='email' placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)}> 

            </Form.Control>



        </Form.Group>

        <br/>


        <Form.Group controlId='password'>
            <Form.Label>
            Password
            </Form.Label>

            <Form.Control type='password' placeholder='enter password' value={password} onChange={(e) => setPassword(e.target.value)}> 

            </Form.Control>



        </Form.Group>
<br/>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>

      </Row>
    </FormContainer>
  )
}

export default LoginScreen
