import React, {Component} from 'react';
import './slide.css';



class Slide extends Component {
    render(){
        const {
            name
        } = this.props;
        return(
            <div className='slide'>
                <div className='imagetextContainerz'>
                {name}
                <div>
                <p> get our { name } text on this</p>
                </div>
                </div>
            </div>
        );
    }
}



export default Slide