import React from 'react'
import  {Link,useNavigate} from 'react-router-dom'
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap'
import Sidebar from './components/sidebar'


function Header(){
  const navigator = useNavigate()
  const user = JSON.parse(localStorage.getItem('user-info'))
  function Logout(){
    localStorage.clear();
    navigator('/login')
  }
    return(
    <Navbar expand="lg" className="bg-body-tertiary custom_navbar">
      <Container fluid>
      <Sidebar/>
        {/* <Navbar.Brand href="#">Logo </Navbar.Brand> */}
        {/* <Navbar.Toggle aria-controls="navbarScroll" /> */}
         <Navbar.Collapse id="navbarScroll" className="username">
          {/* <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >{
            localStorage.getItem('user-info') && !localStorage.getItem('user-info').error?
            <>
            
            <Link to="/all-products">All Products</Link>
            <Link to="/add">Add Products</Link>
            <Link to="/update">Update Products</Link>
            </> 
            :
            <> 
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </> 
          }
          </Nav> */}
          {
            (JSON.parse(localStorage.getItem('user-info')) && JSON.parse(localStorage.getItem('user-info')).error !== '' )?
            <>
            <Nav>
              <NavDropdown title={user && user.name}>
                <NavDropdown.Item onClick={Logout}>Logout</NavDropdown.Item>
                {/* <NavDropdown.Item>Profile</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
            </>
            :
            ''
          }
          
        </Navbar.Collapse> 
      </Container>
    </Navbar>
    );
}

export default Header