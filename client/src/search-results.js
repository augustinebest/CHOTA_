import React from 'react';
import './search-results.css';
import Footer from './components/footer';
import Nav from './components/nav-bar.js';
import SearchBar from './components/search-bar';
import Trends from './components/trends';


const SearchResult = () => {
    return(
        <div className='wrapper'>
            <Nav/>
            <SearchBar/>
            <div className='detail-body'>
            <div className='body-div'>
                <div className='Search-term'> trap House</div>
                <div className='Search-term'> enugu </div>
                <Trends/>
            </div>
            </div>
           <Footer/>
        </div>
    );
}



export default SearchResult