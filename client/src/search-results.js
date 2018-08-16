import React from 'react';
import './search-results.css';
import Footer from './components/footer';
import Nav from './components/nav.js'
import SearchBar from './components/search-bar';
import Trends from './components/trends';


const SearchResult = () => {
    return(
        <div className='wrapper'>
            <Nav/>
            <SearchBar/>
            <div className='body-div'>
                <Trends/>
                <Trends/>
                <Trends/>
            </div>
           <Footer/>
        </div>
    );
}



export default SearchResult