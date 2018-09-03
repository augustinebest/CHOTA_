import React from 'react';
import Comment from './components/comment.js';
import Nav from './components/nav-bar.js';



const commentPage = () => {
    return(
        <div>
            <Nav/>
           <Comment/>
        </div>
    );
}



export default commentPage