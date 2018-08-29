import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './nav-bar.css';
import logo from './logo_dark.png';
import Login from './LoginPage';


const nav = () => {
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <a href="/"> <img src={logo} alt='chota'/></a>
          </Navbar.Brand>
          <Login />
          {/* <button className='btn'> Login </button> */}
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className=''>
          <Nav pullRight>
            <NavItem eventKey={1} href="/about">
             About
            </NavItem>
            <NavItem eventKey={2} href="/advertise">
             Advertise
            </NavItem>
            <NavItem eventKey={3} href="/privacy">
             Privacy
            </NavItem>
            <NavItem eventKey={4} href="/contact">
             Contact
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
        
    )
}



export default nav