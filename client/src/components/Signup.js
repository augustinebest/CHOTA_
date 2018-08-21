import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './Login.css';
import {Link} from 'react-router-dom'
// import Typography from '@material-ui/core/Typography';
// import Validator from "validator";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: '365px',
    boxShadow: '0px 4px 8px 0px #7a6a6a',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 633,
    margin: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: "30px",
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundColor: "#5858f3",
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: 10,
    marginRight: 15,
    width: 260,
    marginTop: "40px",
  },
  menu: {
    width: 200,
  },
});

class Signup extends React.Component {
   constructor(props){
       super(props)
       this.state = {
         username: "",
        email: "",
        password:"",
        loading: false,
       };
   }
  
   handleChange = event =>{
     this.setState({

       [event.target.id]: event.target.value
     });
  
    };

    handleSubmit = (e) => {
      e.preventDefault();

        let data = {...this.state}
        console.log(data)

      axios.post("https://chota1.herokuapp.com/auth/signup", data)
      .then(res =>{
        console.log(res.data.message)
        
        if (res.status === 200){
          console.log(res)
          console.log(res.data.message);
          sessionStorage.setItem('user', res.data.token);
          this.props.history.push('/')
        }
        // if(res.status == 409){
        //   console.log(res)
        // }
      })
      // .catch(err =>{
      //   console.log(err.data.message)
      //   if(err.status === 409){
      //     console.log(err.data.message)
      //   }
      // })
    }  

    render() {
      const { classes } = this.props;
  
      return (
          <div className='form-container'>
        <form className={classes.container} row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="username"
            label="Username"
            className={classes.textField}
            value={this.state.username}
            onChange={this.handleChange}
            margin="auto"
          />
           <TextField
          id="email"
          label="Email"
          className={classes.textField}
          type="email"
          onChange={this.handleChange}
          margin="auto"
        />
             <TextField
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            onChange={this.handleChange}
            margin="auto"
          />
        <TextField
             id="confirm-password"
             label="Confirm-Password"
             className={classes.textField}
             type="password"
             autoComplete="confirm-password"
             onChange={this.handleChange}
             margin="auto"
             />
        <Button variant="contained" color="primary" className={classes.button}
        type="submit">
       Sign up
      </Button>
      <div>
        <p>Already a member? <Link to ='login'>Login</Link></p>
      </div>
        </form>
        </div>
        );
    }
};


Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);