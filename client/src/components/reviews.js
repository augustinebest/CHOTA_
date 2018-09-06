import React from 'react';
import './reviews.css';
import StarRating from './star-rating';
// import UserDetail from './user-detail';

const Reviews = (props) => {
    // const name = sessionStorage.getItem('username');
    return(
        <div>
            {props.comment &&
                props.comment.map((value) =>{
                    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
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
                                   <div>
                                   <StarRating/>  
                                   </div>
                                    <div className='dateOfReview'>{(new Date(value.date)).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
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