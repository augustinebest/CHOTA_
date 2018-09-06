import React,{Component} from 'react';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import './admin-navbar.css';
import logo from './logo_dark.png';
import Search from './search.png';
import ProfileIcon from './account-circle.png';
import {Link} from 'react-router-dom';


class AdminNavBar extends Component {

  Logout = () =>{
    sessionStorage.removeItem('user')
    sessionStorage.clear()
  }
  
  render(){
    return(
      <div>
        <Navbar className='navBarBorder'>
        <Navbar.Header style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
            <Link to="/"> <img src={logo} alt='chota'/></Link>
          </Navbar.Brand>
         <Link to ='/SearchResults'><img src={Search} alt='' id='navNotificationIcon'/></Link>
         <Link to ='/profile'> <img src={ProfileIcon} alt='' id='navProfileIcon'/></Link>
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
            <NavItem>
                <Link to='/'><button onClick={this.Logout} id='logoutBtn'>Logout</button></Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
      </div>
        
    )
  }
   
}



export default AdminNavBar