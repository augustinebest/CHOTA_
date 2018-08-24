import React, { Component } from 'react';
import './../Login.css';
// import {Browser,Switch,Route} from 'react-router-dom';
import axios from 'axios';

class Facebooklogin extends Component {
  
    constructor(props){
        super(props)

    this.submit = this.submit.bind(this);
    }
        submit (e) {
            e.preventDefault();
           axios.get('http://localhost:5000/auth/facebook')
           .then(res => console.log(res));                  
        //   let url = 'http://localhost:5000/auth/facebook'
        //   window.location = url ;
       
        }

    render (){
        return(
            <div > 
                <div className="Container">
                    <div className="row">
                        <div className="col-sm-4"></div>
                            <div   className = 'Login'>
                            <button   className = "GoogleButton" >  Continue with Google</button>
                             <button  className = "Facebookbutton" onClick ={e =>this.submit(e)}> Continue with Facebook</button>
                             
                            </div>
                        <div className="col-sm-4"></div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Facebooklogin