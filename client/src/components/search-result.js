import React from 'react';
import {Link} from 'react-router-dom';
import './search-result.css';



const SearchResults = (props) =>{
    if (sessionStorage.getItem('user')){
        return(
            <div id='searchRes'>
                    {props.items.map(value =>(
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
                        <span> space for rating</span>
                        <p>Gps location of place</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    else{
        return(
            <div id='searchRes'>
                    {props.items.map(value =>(
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

export default SearchResults