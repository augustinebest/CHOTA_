import React, {Component} from 'react';
import './trends.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StarRating from './star-rating';
import View from './view.svg'




class userPinnedLocation extends Component{

state ={
    items: []
}


    componentDidMount(){
        const user = sessionStorage.getItem('userId')
        axios.get(`http://chota1.herokuapp.com/auth/profile/${user}`)
        .then(res=>{
            console.log(res.data.user.pinedPlaces)
            this.setState({items: res.data.user.pinedPlaces})
        })
    }

    render(){
            const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return(
                <div className='trending'>
                    {this.state.items.map(value =>(
                <div key={value}  className='placediv'>
                    <div className='placeImageDiv'>
                    <Link to ={{
                               pathname:`/PlaceDetails/${value._id}`,
                               state: {place: value.name}
                           }}>
    
                            <img src={value.image} alt={value.name} className='placesImage'/> </Link>
                    </div>
                    <div className='placeDetailDiv' >
                    <h4>{value.name}</h4>
                    <span>
                    </span>
                    <div>
                        <StarRating/> <img src={View} alt='' id='viewIcon'/>{value.view}
                   
                    </div>
                    {/* <p>Gps location of place</p> */}
                    <div>
                    {(new Date(value.date)).toLocaleDateString('en-US', DATE_OPTIONS)}
                    </div>
                    </div>
                </div>
                    ))}
                </div>
            );
    }
}


export default userPinnedLocation