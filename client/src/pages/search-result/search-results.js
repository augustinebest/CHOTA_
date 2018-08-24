import React from 'react';
import './search-results.css';
import Footer from '../components/footer/footer.js';
import Nav from '../components/nav-bar/nav-bar.js';
import SearchBar from '../components/search-bar/search-bar.js';
import Trends from '../components/trends/trends.js';


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