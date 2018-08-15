import React from 'react';
import './search-bar.css';
// import {Button, Jumbotron} from "react-bootstrap"
import search from './search.png'


const SearchBar = () => {
    return(
       <div>
           <input type="text" className='searchBar'></input>
           <img src={search} alt='image' className='search-icon'/>
       </div>
    );
}



export default SearchBar