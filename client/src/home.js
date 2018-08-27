import React from 'react';
// import { Row, Col, } from 'react-bootstrap';
import Nav from './components/nav';
import './home.css';
import Carousel from './components/carousel.js';
import SearchBar from './components/search-bar.js';
import Trends from './components/trends';
import Footer from './components/footer';


const Home = () => {
    return(
        <div className='wrapper'>
            <div className='main-container'>
                    <Nav/>
                <div className='topContainer'>
                    <h3> Search for the best places in town </h3>
                    <SearchBar/>
                </div> 
                <h4>Find Quickly</h4>           
                <Carousel/>
                <div className='bottomcContainer'>
                <h4> Trending </h4>
                    <Trends/>
                </div>
            </div>
            <Footer/>
        </div>
        
    );
}



export default Home