import React from 'react';
import Nav from './components/nav-bar.js';
import Footer from './components/footer';
import './advertise.css';



const Advertise = () => {
   return(
        <div>
         <Nav/>
         <div className='staticPageNavButtonContainer'>
             <a href='/about'><button className='staticPageLinkButton'>About</button></a>
             <a href='/advertise'><button className='staticPageLinkButton'>Advertise</button></a>
             <a href='/privacy'><button className='staticPageLinkButton'>Privacy</button></a>
             <a href='/contact'><button className='staticPageLinkButton'>Contact</button></a>
         </div>
         <div className='contentBody'>
             <div>
             <h4 className='staticPageHeader'>Advertise</h4>
             </div>
             <p>It is a long established fact that a reader will be distracted by the readable
                  content of a page when looking at its layout. The point of using Lorem 
                  Ipsum is that it has a more-or-less normal distribution of letters, as 
                  opposed to using 'Content here, content here', making it look like readable
                   English. Many desktop publishing packages and web page editors now use
                    Lorem Ipsum as their default model text, and a search for 'lorem ipsum' 
                    will uncover many web sites still in their infancy. Various
                  versions have evolved over the years, sometimes by accident, sometimes 
                  on purpose (injected humour and the like).</p>
         </div>
         <div>
         <Footer/>
         </div>
        </div>
    );
}





export default Advertise