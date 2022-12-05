import React from "react";
import { Navbar, Container, Nav, NavDropdown,Form,Row,Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox'



function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userinfo } = userLogin;
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar className="ml-auto" bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="test">ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <div className="ml-auto">
            <Nav >
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart">Cart</i>
                </Nav.Link>
              </LinkContainer>
              {userinfo ? (
                <NavDropdown title={userinfo.name} id="username" >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                
                  <Col className="login">
                <LinkContainer   to="/login">
                  <Nav.Link>
                    <i className="fas fa-user">login</i>
                  </Nav.Link>
                </LinkContainer>
                </Col>
             
                
              )}

              {userinfo && userinfo.isAdmin && (
                <NavDropdown title='Admin' id="adminmenu">
                <LinkContainer to="/admin/userlist/">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist/">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orderlist/">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
                
              )}
            </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
