import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './admin-navbar.css';
import logo from './logo_dark.png';
import Search from './search.png';
import ProfileIcon from './account-circle.png';
import {Link} from 'react-router-dom';


const AdminNavBar = () => {
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <Link to="/"> <img src={logo} alt='chota'/></Link>
          </Navbar.Brand>
         <img src={Search} alt='' id='navNotificationIcon'/>
         <img src={ProfileIcon} alt='' id='navProfileIcon'/>
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



export default AdminNavBar