import React from 'react';
// import { Row, Col, } from 'react-bootstrap';
import Nav from './components/nav';
import './home.css';
import Carousel from './components/carousel.js';
// import SearchBar from './components/search-bar.js';
import Trends from './components/trends';
import Footer from './components/footer';
import SearchIcon from './Button(1).png';
import {Link} from 'react-router-dom';


const Home = () => {
    return(
        <div className='wrapper'>
            <div className='main-container'>
                    <Nav/>
                <div className='topContainer'>
                    <h3> Search for the best places in town </h3>
                    {/* <SearchBar where="home"/> */}
                    <div className='seachIconArea'><Link to='/SearchResults'><img src={SearchIcon} alt='search' id='searchIcon'/></Link></div>
                   {/* <SearchBar getData={this.getdata} where="search"/> */}
                </div> 
                <h4>Find Quickly</h4>           
                <Carousel/>
                <div id='bottomcContainer'>
                <h4> Trending </h4>
                    <Trends/>
                </div>
            </div>
            <Footer/>
        </div>
        
    );
}



export default Home