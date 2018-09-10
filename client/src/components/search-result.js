import React from 'react';
import {Link} from 'react-router-dom';
import './search-result.css';
import StarRating from './star-rating';
import View from './view.svg';



const SearchResults = (props) =>{
    if (sessionStorage.getItem('user')){
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
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
    else{
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return(
            <div id='searchRes'>
                    {props.items.map(value =>(
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

export default SearchResults