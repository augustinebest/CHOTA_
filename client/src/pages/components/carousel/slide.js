import React, {Component} from 'react';
import './slide.css';



class Slide extends Component {
    render(){
        const {
            name
        } = this.props;
        return(
            <div className='slide'>
            <p>{name}</p>
            </div>
        );
    }
}



export default Slide