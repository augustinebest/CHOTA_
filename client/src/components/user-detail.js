import React from 'react';


const userDetail = (props) => {
    return(
        <div>
             <div className='personalDetail'>
                        <div className='imageDivForProfile'>
                        {/* <img src={props.user.image} alt=''/> */}
                        </div>
                        <p className='name'>{props.user.username}</p>
                        </div>
        </div>
    );
}



export default userDetail