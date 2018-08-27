import React from 'react';
import './search-bar.css';
// import {Button, Jumbotron} from "react-bootstrap"


const SearchBar = (props) => {
    return(
       <form onSubmit={props.getData}>
           <input type="text" className='searchBar' name='recipeName'></input>
          <button className='searchButton'> Search </button>
          {/* <img src={search} alt='image' className='search-icon'/> */}
       </form>
    );
}



export default SearchBar