import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Navigation from './Navigation';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import Validator from "validator";
import InlineError from './Messages/InlineErrors';
import spinner from './assets/spinner.gif';
import logo from './assets/logo.png';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection: 'column',
    backgroundColor: 'white',
    height: '365px',
    boxShadow: '0px 4px 8px 0px #7a6a6a',
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: 300,
    marginTop: "30px",
    margin: 'auto'
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: '123px',
    marginRight: '116px',
    borderBottomRightRadius: "10PX",
    borderTopLeftRadius: "10px",
    backgroundColor: "#5858f3",
  },
  input: {
    display: 'none',
  },

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    marginTop: "30px",
  },
  menu: {
    width: 200,
  },
});

class Login extends React.Component {
   constructor(props){
       super(props)
       this.state = {
         user: {
           email: "",
           password: "",
         },
        loading: false,
        errors: {}
       };
   }
  
   handleChange = event =>{
     this.setState({
      user: {...this.state.user, [event.target.id]: event.target.value }
     });
    };
    submit = user =>{
      axios.post("https://chota1.herokuapp.com/auth/login", user, {headers: { }})
      .then(res =>{
      console.log(res.data.message);
      if (res.status === 200){
        console.log(res)
        console.log(res.data.message);
        alert(JSON.stringify(res.data.message));
        sessionStorage.setItem('user', res.data.token);
        console.log( sessionStorage.getItem('user'))
        this.props.history.push('/')
      }
      })
  
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

    validate = user => {
     const errors = {};
     if (!Validator.isEmail(user.email)) errors.email = "Invalid Email";
    if (!user.password) errors.password = "cant be blank";
    return errors;
    
    }

  
      render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
  
        return (
          <div>
            <div><Link to ='/'><img src={logo} alt='logo' className='image-logo'/></Link></div>
            <div className='form-container'>
            {loading && <div style={{
                      width: '10%',
                      position: 'absolute',
                      marginTop: '7%',
                      marginLeft: '45%',
                      alignItems: "center"
                  }}><img alt="spinner" src={spinner}/></div>}

              <form className={classes.container}  row={true} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  margin="auto"
                  />
                {errors.email && <InlineError text={errors.email}/>}
                <TextField
                id="password"
                label="Password"
                className={classes.textField}
                type="password"
                value={this.state.password}
                autoComplete="current-password"
                onChange={this.handleChange}
                margin="auto"
                />
                {errors.password && <InlineError text={errors.password}/>}
                <br/>
                <Button variant="contained" color="primary" className={classes.button} type="submit">
                  Login
                </Button>
                <p className='message'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
              </form>
            </div>
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

export default withStyles(styles)(Login);