import React from 'react';
import Nav from './components/nav-bar.js';
import './place-details.css';
import Reviews from './components/review.js';
import Footer from './components/footer.js';
import axios from 'axios'

class PlaceDetails extends React.Component{
    state={
        places: []
    }
    componentDidMount(){
        const location = this.props.match.params.id
        console.log(location)
        axios.get(`https://chota1.herokuapp.com/place/single/${location}`)
        .then(res =>{
            console.log(res)
            this.setState({
                places: res.data
            })
        })
    }

    render(){
        const {places} = this.state
    return(
        <div>
           <Nav/>
           <div className='placeImage'>
           <img src={places.image} alt={places.name} id='placeDetailImage'/>
           </div>
           <div className='placedetails'>
                <div className='placeMap'></div>
                <div className='placeName'>
                <h4> {places.name} </h4>
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
}



export default PlaceDetails