import React from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './nav-bar.css';
import logo from './logo_dark.png';
import Search from './search.png';
import ProfileIcon from './account-circle.png';
import {Link} from 'react-router-dom';
// import Login from './LoginPage';


const nav = () => {

 const Logout = () =>{
    sessionStorage.removeItem('user')
  }

  if(!sessionStorage.getItem('user')){
    
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <Link to='/'> <img src={logo} alt='chota'/></Link>
          </Navbar.Brand>
          {/* <Login /> */}
          {/* <button className='btn'> Login </button> */}
          <Link to = '/Login'> <button className='btn'> Login </button> </Link>
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
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
        
    )
  }
  else{
    
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <Link to="/"> <img src={logo} alt='chota'/></Link>
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
            <NavItem>
            <Link to='/'><button onClick={Logout} className='logoutButton'>Logout</button></Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
        
    )
  }
}



export default nav