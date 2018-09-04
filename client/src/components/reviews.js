import React from 'react';
import './reviews.css';
// import UserDetail from './user-detail';

const Reviews = (props) => {
    // const name = sessionStorage.getItem('username');
    return(
        <div>
            {props.comment &&
                props.comment.map((value) =>{
                    if(value.user_id){

                        return(
                           <div>
                               <div className='reviewdetails'>
                                   <div className='personalDetail'>
                                   <div className='imageDivForProfile'>
                                    <img src={value.user_id.image} alt='' id='userProfileImage' />
                                   </div>
                                   <p className='name'>{value.user_id.username}</p>
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
                    }
          }) }

        </div>
    );
}



export default Reviews