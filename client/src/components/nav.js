import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './nav.css';
import logo from './logo_invt.png'


const nav = () => {
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"> <img src={logo} alt='chota'/></a>
          </Navbar.Brand>
          <button className='btn'> Login </button>
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