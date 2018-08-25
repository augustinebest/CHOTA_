import React from 'react';
import Nav from './components/nav-bar.js';
import './place-details.css';
import Reviews from './components/review.js';
import Footer from './components/footer.js';


const PlaceDetails = () => {
    return(
        <div>
           <Nav/>
           <div className='placeImage'></div>
           <div className='placedetails'>
                <div className='placeMap'></div>
                <div className='placeName'>
                <h4> Name of place </h4>
                <p>Rating</p>
                <p>GPS location</p>
                </div>
           </div>
           <h3>Recent Reviews</h3>
           <Reviews/>
           <div>
           <Footer/>
           </div>
        </div>
    );
}



export default PlaceDetails