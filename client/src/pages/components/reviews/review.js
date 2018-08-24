import React, {Component} from 'react';
import './reviews.css';




class Reviews extends Component {
    render(){
        return(
            <div>
                <div className='reviewdetails'>
                    <div className='personalDetail'>
                    <div className='imageDivForProfile'></div>
                    <p className='name'>Name</p>
                    </div>
                    <div className='reviews'>
                        <p> This is where the actual reviews and comments and the bullshit 
                            some people will want to post...
                             dont really mind what i am typing right now... 
                             just texting my reviews view shit... 
                             thanks and fuck you....!</p>
                    </div>
                    <div className='ratingDate'>
                    <div>Rating</div>
                    <div className='dateOfReview'> Date </div>
                    </div>

                </div>
            </div>
        );
    }
}



export default Reviews