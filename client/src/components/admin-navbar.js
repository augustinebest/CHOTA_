import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './admin-navbar.css';
import logo from './logo_dark.png';
import NotificationIcon from './notification-icon.png';
import ProfileIcon from './profile-icon.png';


const AdminNavBar = () => {
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <a href="/"> <img src={logo} alt='chota'/></a>
          </Navbar.Brand>
         <img src={NotificationIcon} alt='' id='navNotificationIcon'/>
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