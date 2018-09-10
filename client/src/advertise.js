import React from 'react';
import Nav from './components/nav-bar.js';
import Footer from './components/footer';
import {Link} from 'react-router-dom';
import './advertise.css';



const Advertise = () => {
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
             <h4 className='staticPageHeader'>Advertise</h4>
             </div>
             <p>
              Email us at contact@chota.ng.

             </p>
         </div>
         <div>
         <Footer/>
         </div>
        </div>
    );
}





export default Advertise