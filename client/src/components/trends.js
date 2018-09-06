import React, {Component} from 'react';
import './trends.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StarRating from './star-rating';
import View from './view.svg';




// const API_KEY = '56f0450d2729d1d9861d643496069047'

class Trends extends Component{

state ={
    items: []
}


    componentDidMount(){
        axios.get(`https://chota1.herokuapp.com/trending`)
        .then(res=>{
            console.log(res.data)
            this.setState({items: res.data})
        })
    }

    render(){
        if (sessionStorage.getItem('user')){
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
        else{
            const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return(
                <div  className='trending'>
                        {this.state.items.map(value =>(
                        <div key={value}  className='placediv'>
                            <div className='placeImageDiv'>
                                <Link to='/Login'><img src={value.image} alt={value.name} className='placesImage'/></Link>
                            </div>
                            <div className='placeDetailDiv' >
                            <h4>{value.name}</h4>
                            <span>
                            <StarRating/>
                            </span>
                            <div>
                    <img src={View} alt='' id='viewIcon'/>{value.view}
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
}


export default Trends