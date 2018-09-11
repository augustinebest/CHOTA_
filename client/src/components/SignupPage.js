import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './../components/LoginPage.css';
import Modal from 'react-responsive-modal';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
import logo from './logo_dark.png';
import  Loader from './Loader'
class  Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : "",
            email: "",
            password:"",
            loading:false,
            open : true
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };

    handleChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        let data = {...this.state}
        console.log(data)

    axios.post("https://chota1.herokuapp.com/auth/create", data)
    .then(res =>{
        console.log(res)

        if(res.status ===200){
            console.log(res)
            console.log(res.data.message);
            sessionStorage.setItem('user',res.data.token);
            this.setState({
                open:false
            })
            this.props.history.push('/Login')
        }
    })
    }

    render(){
        const { open,loading } = this.state;
        return (
          <div>
              <Navbar className='navBarBorder'>
        <Navbar.Header  style={{backgroundColor: '#F2F2F2'}}>
          <Navbar.Brand>
          <Link to="/"> <img src={logo} alt='chota'/></Link>
          </Navbar.Brand>
          {/* <Login /> */}
         <Link to= '/'> <button className='btn'> Home </button> </Link>
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
            {/* <button className= 'btn' onClick={this.onOpenModal}>Signup</button> */}
            <Modal open={open} onClose={this.onCloseModal} little>
              <div className="center">
                <div className="card">
                {
										loading &&
										<div style={{position: 'relative', top: '150px', left: '120px'}}>
											<Loader />
										</div>
									}
                    <h1> Signup</h1>
                    <Link to = '/'> <button className = 'closebuttonsignup'>X</button> </Link>
                    <form onSubmit={this.handleSubmit}>
                        <label>Email:</label> <input className="form-item" type = "text"  name = "email" value={this.state.email} onChange={this.handleChange} />
    
                       
    
                        <label>Username:</label> <input className="form-item" type= "text"  name = "username" value={this.state.username} onChange={this.handleChange}
                        /> 
    
                        <label>Password:</label> <input  className="form-item" type = 'password' name = "password" value={this.state.password} onChange={this.handleChange} />
    
                       
                            <button className="form-submit" value = "Submit" type = "submit">Submit</button>
                            <p className='message'>Have an account? <Link to = '/Login'>LogIn</Link></p>
                            <br/>
                            <br/>
                            <p className ='message'> By sigining up you have agreed to our <Link to = '/Privacy'>Terms and Conditions </Link></p>
                    </form>
                </div>
                </div>
            </Modal>
          </div>
        );
    }
};

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Signup 