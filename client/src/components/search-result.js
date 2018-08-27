import React from 'react';



const SearchResults = (props) =>{
    return(
        <div>
            {props.items.map(value =>(
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

export default SearchResults