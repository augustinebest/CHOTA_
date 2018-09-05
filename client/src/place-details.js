import React from 'react';
import Nav from './components/nav-bar.js';
import './place-details.css';
import Reviews from './components/review.js';
import Review from './components/reviews';
import Footer from './components/footer.js';
import axios from 'axios';

class PlaceDetails extends React.Component{
    state={
        places: [],
        place:[]
    }
    componentDidMount(){
        const location = this.props.match.params.id
        console.log(location)
        axios.get(`https://chota1.herokuapp.com/place/single/${location}`)
        .then(res =>{
            console.log(res.data.result)
            this.setState({
                places: res.data.result.reviews,
                place: res.data.result
            })
        })
    }

    render(){
        const {place, places} = this.state
    return(
        <div>
           <Nav/>
           <div className='placeImage'>
           <img src={place.image} alt={place.name} id='placeDetailImage'/>
           </div>
           <div className='placedetails'>
                {/* <div className='placeMap'></div> */}
                <div className='placeName'>
                <h4 id='placename'> {place.name} </h4>
                <p>{place.description}</p>
                {/* <p>Rating</p>
                <p>GPS location</p> */}
                </div>
           </div>
           <div id='place-detail-bottom'>
           <h3>Recent Reviews</h3>
           <Reviews
            pageId={ this.props.match.params.id}/>
            <Review
            comment={places}
            />
           </div>
           <div>
           <Footer/>
           </div>
        </div>
    );
}
}



export default PlaceDetails