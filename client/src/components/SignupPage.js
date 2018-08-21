import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './../components/LoginPage.css';

class  Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : "",
            email: "",
            password:"",
            loading:false,
        };
    }

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

        // if(res.status ===200){
        //     console.log(res)
        //     console.log(res.data.message);
        //     sessionStorage.setItem('user',res.data.token);
        //     this.props.history.push('/')
        // }
    })
    }

    render(){
        return(
            <div className="center">
            <div className="card">
                <h1> Signup</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Email:</label> <input className="form-item" type = "text"  name = "email" value={this.state.email} onChange={this.handleChange} />

                   

                    <label>Username:</label> <input className="form-item" type= "text"  name = "username" value={this.state.username} onChange={this.handleChange}
                    /> 

                    <label>Password:</label> <input  className="form-item" type = 'password' name = "password" value={this.state.password} onChange={this.handleChange} />

                   
                        <button className="form-submit" value = "Submit" type = "submit">submit</button>
                        <p className='message'>Have an account? <Link to = '/Login'>LogIn</Link></p>
                        <br/>
                        <br/>
                        <p className ='message'> By sigining up you have agreed to our <Link to = '/Privacy'>Terms and Conditions </Link></p>
                </form>
            </div>
            </div>
        );
    }
};

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default Signup 