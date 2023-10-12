import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link,useNavigate } from 'react-router-dom';
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigator = useNavigate()
  const user = JSON.parse(localStorage.getItem('user-info'))
  function Logout(){
    localStorage.clear();
    navigator('/login')
  }
  return (
    <>
      <Button className='menuBtn' variant="light" onClick={handleShow}>
      &#9776;
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><b>Logo Here</b></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Navbar expand="lg" className="bg-body-tertiary custom_navbar sidebar">
      <Container fluid>
        <Navbar.Brand href="#">Admin Dashboard </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 menu-Items"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <a href='http://localhost:3001/'>Visit Site</a>
            {
            localStorage.getItem('user-info') && !localStorage.getItem('user-info').error?
            <>
            
            <Link to="/all-products">All Products</Link>
            <Link to="/add">Add Products</Link>
            <Link to="/add">Products Discussion</Link>
            <Link to="/add">Order Management</Link>
            <Link to="/add">Users Management</Link>
            <Link to="/add">System Settings</Link>
            <Link to="/add">Website Settings</Link>
            </> 
            :
            <> 
            <Link to="/login">Login</Link>
            {/* <Link to="/register">Register</Link> */}
            </> 
          }
          </Nav>
          {
            localStorage.getItem('user-info')?
            <>
            <Nav><a onClick={Logout} target='_blank'>Logout</a></Nav>
            {/* <Nav>
              <NavDropdown title={user && user.name}>
                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav> */}
            </>
            :
            ''
          }
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;