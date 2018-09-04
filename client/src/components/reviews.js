import React from 'react';
import './reviews.css';
// import UserDetail from './user-detail';

const Reviews = (props) => {
    // const name = sessionStorage.getItem('username');
    return(
        <div>
            {props.comment.map((value) =>{
             return(
                <div>
                    <div className='reviewdetails'>
                        <div className='personalDetail'>
                        <div className='imageDivForProfile'>
                        
                        </div>
                        <p className='name'>name</p>
                        </div>
                        <div className='reviews'>
                            <p>{value.commentBody}</p>
                        </div>
                        <div className='ratingDate'>
                        <div>Rating</div>
                        <div className='dateOfReview'> Date </div>
                        </div>
    
                    </div>
                </div>
            );
          }) }

        </div>
    );
}



export default Reviews