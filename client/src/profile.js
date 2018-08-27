import React from 'react';
import AdminNavBar from './components/admin-navbar';
import './profile.css';
import Trends from './components/trends';
import ProfileIcon from './profile-icon.png'



const Profile = () => {
    return(
        <div>
            <AdminNavBar/>
            <div id='Admin'>
                <div>
                    <img src={ProfileIcon} alt=''/>
                </div>
                <span id='profile'>
                <b>Arthur Bosah</b>
                <p>okpoko</p>
                </span>
                <button id='followButton'> Follow + </button>
            </div>
            <div id='recentPlaces'>
                <h3>Recent Places</h3>
                <Trends/>
            </div>
        </div>
    );
}



export default Profile