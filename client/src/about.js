import React from 'react';
import Nav from './components/nav-bar.js';
import Footer from './components/footer';
import {Link} from 'react-router-dom';
import './about.css';


const About = () => {
    return(
        <div>
         <Nav/>
         <div className='staticPageNavButtonContainer'>
             <Link to='/about'><button className='staticPageLinkButton'>About</button></Link>
             <Link to='/advertise'><button className='staticPageLinkButton'>Advertise</button></Link>
             <Link to='/privacy'><button className='staticPageLinkButton'>Privacy</button></Link>
             <Link to='/contact'><button className='staticPageLinkButton'>Contact</button></Link>
         </div>
         <div className='contentBody'>
             <div>
             <h4 className='staticPageHeader'>About</h4>
             </div>
             <p>
                Find Places. Pin Experiences.
                Chota is a platform that helps people find places of interest in a new city. It connects city visitors to interesting locations, and allows them pin their experiences to those locations.
                Setting up an account is easy and you can be done in 30 seconds.
            </p>
         </div>
         <div>
         <Footer/>
         </div>
        </div>
    );
}



export default About