import React, {Component} from 'react';
import './trends.css';
import axios from 'axios';



const API_KEY = '56f0450d2729d1d9861d643496069047'

class Trends extends Component{

state ={
    items: []
}


    componentDidMount(){
        axios.get(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=shredded%20chicken&count=10`)
        .then(res=>{
            console.log(res)
            this.setState({items: res.data.recipes})
        })
    }

    render(){
        
    return(
        <div>
            {this.state.items.map(value =>(
        <div key={value}  className='placediv'>
            <div className='placeImageDiv'>
                <img src={value.image_url} alt={value.title} className='placesImage'/>
            </div>
            <div className='placeDetailDiv' >
            <h4>{value.title}</h4>
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