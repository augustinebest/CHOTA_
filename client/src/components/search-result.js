import React from 'react';



const SearchResults = (props) =>{
    return(
        <div>
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

export default SearchResults