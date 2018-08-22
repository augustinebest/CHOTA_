import React, {Component} from 'react'
import AuthService from './../components/AuthService';
import withAuth from './../components/withAuth';
const Auth =  new AuthService();


class Logout extends Component {
       render() {
        return(
            <div>
                <h2></h2>
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                </p>
            </div>
        )
       }
       handleLogout(){
        Auth.logout()
        this.props.history.replace('/login');
     }
}

export default  withAuth(Logout) 