import React from 'react';
import AdminNavBar from './components/admin-navbar';
// import Nav from './components/nav';
import './profile.css';
import UserPinnedLocation from './components/userpin.js';
import ProfileIcon from './profile-icon.png';
import axios from 'axios';



class Profile extends React.Component {
    state={
        userpins: []
    }


   componentDidMount(){
        const user = sessionStorage.getItem('userId')
        console.log(user)
        axios.get(`http://chota1.herokuapp.com/auth/profile/${user}`)
        .then(res=>{
            console.log(res.data.user.pinedPlaces)
            this.setState({userpins: res.data.user.pinedPlaces})
        })
    }


    render(){
        const name = sessionStorage.getItem('username')

        return(
            <div>
            <AdminNavBar/>
            {/* <Nav/> */}
            <div id='Admin'>
                <div>
                    <img src={ProfileIcon} alt=''/>
                </div>
                <span id='profile'>
                <b>{name}</b>
                {/* <p>okpoko</p> */}
                </span>
                {/* <button id='followButton'> Follow + </button> */}
            </div>
            <div id='recentPlaces'>
                <h3>Recent Places</h3>
                <UserPinnedLocation item={this.state.userpins}/>
            </div>
        </div>
    );
    }
       
}



export default Profile