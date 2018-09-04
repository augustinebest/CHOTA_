import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';
// import {Button, Jumbotron} from "react-bootstrap"


const Footer = () => {
    if (!sessionStorage.getItem('user')){
        return(
            <footer className="navbar-fixed-bottom">
            <div className="container">
                <div className="row">
                    <p> Find interesting places around you! </p>
                    <Link to='/Login'><button id='pinButton'> Get Started </button></Link>
                </div>
            </div>
            </footer>
);
    }
    else{
        return(
            <footer className="navbar-fixed-bottom">
            <div className="container">
                <div className="row">
                    <p> Have you been to an interesting place recently? </p>
                    <Link to='/PinLocation'><button id='pinButton'> Pin Location </button></Link>
                    <Link to='/drop-Comment'> <button id='reviewApp'> Review App </button></Link>
                </div>
            </div>
            </footer>
);
    }
   
}



export default Footer