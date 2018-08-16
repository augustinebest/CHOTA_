import React from 'react';
import './search-bar.css';
// import {Button, Jumbotron} from "react-bootstrap"


const SearchBar = () => {
    return(
       <form>
           <input type="text" className='searchBar'></input>
          <button className='searchButton'zk > Search </button>
          {/* <img src={search} alt='image' className='search-icon'/> */}
       </form>
    );
}



export default SearchBar