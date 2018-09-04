import React,{Component} from 'react';
import axios from 'axios';
import Validator from 'validator'
import PropTypes from 'prop-types';
import './../components/LoginPage.css';
import {Link} from 'react-router-dom';
import InlineError from './messages/InlineError';
import Modal from 'react-responsive-modal';
// import Signup from './SignupPage';
import logo from './logo_dark.png';
// import './nav.css';
import {Navbar, Nav, NavItem,} from "react-bootstrap";
// import AuthService from './../components/AuthService';

class Login extends Component {
  
        state ={
                user: {
                  email: "",
                  password: "",
                },
                errors: {},
                open : true,
                userId: []
        }

        onOpenModal = () => {
            this.setState({ open: true });
          };

        onCloseModal = () => {
        this.setState({ open: false });
        };
          
            handleChange = (event) =>{
            this.setState({
              user: {...this.state.user, [event.target.name]: event.target.value }
            });
          };
          
          submit = user =>{
            axios.post("https://chota1.herokuapp.com/auth/signin", user)
            .then(res =>{
              //  console.log(res.data.message);
              console.log(user)
              if (res.status === 200){
                //  console.log(res.data._id)
                //  console.log(res.data.message);
                alert(JSON.stringify(res.data.message));
                sessionStorage.setItem('user', res.data.token);
                sessionStorage.setItem('username', res.data.username);
                sessionStorage.setItem('userId', res.data._id)
                // sessionStorage.setItem('email', res.data.email);
                //  console.log( sessionStorage.getItem('user'));
                this.setState({userId: res.data})
                //  sessionStorage.setItem('username', this.state.userId)
                this.setState({
                  open:false
                })
                // console.log(this.props.history);
                this.props.history.push('/profile');
                
                
              }
            })
            console.log(user)
            
            // this.props.history.push('/');
          }
          
          handleSubmit = (e) =>{
            e.preventDefault();
            const errors = this.validate(this.state.user);
            this.setState({ loading: true})
            this.setState({errors});
            if(Object.keys(errors).length ===0){
              this.submit(this.state.user)
            }
          };
          
          validate = (user) => {
            const errors = {};
            if (!Validator.isEmail(user.email)) errors.email = "Invalid Email";
            if (!user.password) errors.password = "cant be blank";
           return errors;
           
           }  

        render(){
            const {errors} = this.state
            const {open} = this.state
            return(
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
        <div> God is with me. you like it or NOT. lol</div>
                        <Modal open={open} onClose={this.onCloseModal} little>
                           <div className="center">
                                    <div className="card">
                                    
                                        <h1> Login</h1>
                                        <form onSubmit={this.handleSubmit}>
                                            <label>Email:</label> <input className="form-item" type= "text"  name = "email" value={this.state.email} onChange={this.handleChange}/> 
                                            {errors.email && <InlineError text={errors.email}/>}
                                            <label>Password:</label> <input  className="form-item" type = 'password' name = "password" value={this.state.password} onChange={this.handleChange}/>
                                            {errors.password && <InlineError text={errors.password}/>}
                                            <br/>
                                                <button className="form-submit" value = "Submit" type = "submit">submit</button>
                                                {/* <p className='message'>Don't have an account?</p> <Signup/> */}
                                               <p className='message'> Don't have an account? <Link to = '/Signup'>Sign up</Link></p>
                                        </form>
                                    </div>
                                </div>
                        </Modal>
                  </div>
                
            );
       
        }
    };

    Login.propTypes = {
        classes: PropTypes.object.isRequired,
        submit: PropTypes.func.isRequired,
        history: PropTypes.shape({
          push: PropTypes.func.isRequired
        })
      };



export default Login