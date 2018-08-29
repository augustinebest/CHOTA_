import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './nav.css';
import logo from './logo_invt.png'
// import Login from './LoginPage';


class nav extends React.Component{
  
  onOpenModal = () => {
    this.setState({ open: true });
  };
  render(){

    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"> <img src={logo} alt='chota'/></a>
          </Navbar.Brand>
          {/* <Login /> */}
         <a href = '/Login'> <button className='btn' onClick={this.onOpenModal}> Login </button> </a>
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
    
        
    
}



export default nav