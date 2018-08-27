import React from 'react';
import AdminNavBar from './components/admin-navbar';
import './pin-location.css'


const PinLocation = () => {
    return(
        <div style={{backgroundColor:' #E5E5E5', height:'100%'}}>
            <AdminNavBar/>
            <div id='addingLocation'>
                <div className='locationImage'></div>
                <div className='locationImage'></div>
                <button id='add'>+</button>
                {/* <span style={{}}><p>add location</p></span> */}
            </div>
            <div id='reviewPortion'>
                <span><b>Review Location</b></span>
                <input type="text" id='reviewArea'></input>
            </div>
            <div id='ratingPortion'>
                <b>Star Rating</b>
                <div id='locationComandBtn'>
                <button id='pinLocation'>PIN</button>
                <button id='cancelLocation'>CANCEL</button>
                </div>
            </div>
        </div>
    );
}



export default PinLocation