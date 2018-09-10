import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './admin-navbar.css';
import logo from './logo_invt.png'
import Search from './search.png';
import ProfileIcon from './account-circle.png';
import {Link} from 'react-router-dom';


const AdminHomeNavBar = () => {
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"> <img src={logo} alt='chota'/></a>
          </Navbar.Brand>
          <Link to='/SearchResults'><img src={Search} alt='' id='navNotificationIcon'/></Link>
         <Link to='/Profile'><img src={ProfileIcon} alt='' id='navProfileIcon'/></Link>
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



export default AdminHomeNavBar