import React, {Component} from 'react';
import './trends.css';
import axios from 'axios';



// const API_KEY = '56f0450d2729d1d9861d643496069047'

class Trends extends Component{

state ={
    items: []
}


    componentDidMount(){
        axios.get(`https://chota1.herokuapp.com/place`)
        .then(res=>{
            console.log(res.data.place)
            this.setState({items: res.data.place})
        })
    }

    render(){
        
    return(
        <div>
            {this.state.items.map(value =>(
        <div key={value}  className='placediv'>
            <div className='placeImageDiv'>
                <img src={value.image} alt={value.name} className='placesImage'/>
            </div>
            <div className='placeDetailDiv' >
            <h4>{value.name}</h4>
            <span> space for rating</span>
            <p>Gps location of place</p>
            </div>
        </div>
            ))}
        </div>
    );
    }
}


export default Trends