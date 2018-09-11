import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './find-quickly.css';
import { Row, Col, } from 'react-bootstrap';
 
class FindQuickly extends Component {
    render() {
        return (
            <div>
                <Col xs={12} className='container'>
                <Carousel>
                <div className='blocks'>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div className='blocks'>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div className='blocks'>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            </Col>
            
            </div>
        );
    }
};


export default FindQuickly