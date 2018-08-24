import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import './carousel.css';
import scrollTo from './scrollToAnimate.js';
import throttle from 'lodash.throttle';
import classNames from 'classnames';
import axios from 'axios';



const API_KEY = '56f0450d2729d1d9861d643496069047'



class Carousel extends Component {
    constructor(props){
        super(props);
        this.handleLeftNav = this.handleLeftNav.bind(this);
        this.onResize = this.onResize.bind(this);
        this.throttleResize = throttle(this.onResize, 250);
        this.throttleScroll = throttle(this.onScroll, 250);
        this.animatingLeft = false;
        this.animatingRight = false;
        this.state = {
            numOfSlidesToScroll: 4,
            allTheWayLeft: false,
            allTheWayRight: false,
            items: []

        }
    }


    onScroll = (e) =>{
        this.checkIfSlidesAllTheWayOver();
    }

    onResize(){
        this.checkNumOfSlidesToScroll();
    }

    checkIfSlidesAllTheWayOver(){
        console.log('context',this)
        const {carouselViewport} = this.refs
        
        //if scroll left === 0 do not show BTN
        var allTheWayLeft = false;
        if ( carouselViewport.scrollLeft===0 ) {
            allTheWayLeft = true;
        }

        //if scrollLeft + lengthOfViewPortOfSetwidth === total length of viewport
        // do not show right Btn.

        var allTheWayRight = false;
        var amountScrolled = carouselViewport.scrollLeft;
        var viewportLength = carouselViewport.clientWidth;
        var totalWidthOfCarousel = carouselViewport.scrollWidth;
        console.log('scrolling just watch', totalWidthOfCarousel, amountScrolled + viewportLength, amountScrolled );
        if ( amountScrolled + viewportLength === totalWidthOfCarousel) {
            allTheWayRight = true;
        }

        if ( this.state.allTheWayLeft !== allTheWayLeft || this.state.allTheWayRight !== allTheWayRight) {
            this.setState({
                allTheWayLeft,
                allTheWayRight
            })
        }
    }


    componentDidMount(){
        this.checkNumOfSlidesToScroll();
        this.checkIfSlidesAllTheWayOver();
        window.addEventListener('resize', this.throttleResize);
        window.addEventListener('keydown', this.onKeydown);
        axios.get(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=shredded%20chicken&count=10`)
        .then(res=>{
            console.log(res)
            this.setState({items: res.data.recipes})
        });

    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.throttleResize);
        window.removeEventListener('keydown', this.onKeydown);
    }


    onKeydown = (e) =>{
        console.log(e.keyCode);
        const {keyCode} = e;
        var leftArrow = keyCode === 37;
        var rightArrow = keyCode === 39;
        if (leftArrow && !this.state.allTheWayLeft) {
            if ( !this.animatingLeft ) {
                this.animatingLeft = true;
                this.handleLeftNav().then(()=>{
                    this.animatingLeft = false;
                });
            }
        }else if (rightArrow && !this.state.allTheWayRight) {
            if ( !this.animatingRight ) {
                this.animatingRight = true;
                this.handleRightNav().then(()=>{
                    this.animatingRight = false;
                });
            }
        }
    }

    checkNumOfSlidesToScroll() {
        var numOfSlidesToScroll;
        if ( window.innerWidth <= 900 ) {
            numOfSlidesToScroll = 'full'
        } else {
            numOfSlidesToScroll = 4
        }
        if (this.state.numOfSlidesToScroll !== numOfSlidesToScroll) {
            console.log('in here pls', numOfSlidesToScroll)
            this.setState({
                numOfSlidesToScroll
            })
        }
 
    }


    widthAndTimeToScroll() {
        const { carouselViewport } = this.refs;
        var numOfSlidesToScroll = this.state.numOfSlidesToScroll;
        if (numOfSlidesToScroll === 'full') {
            return{
                widthToScroll: carouselViewport.offsetWidth,
                timeToScroll: 400
            }
        } else {
            // var widthOfSlides = document.querySelector('.slide').offsetWidth;
        //    console.log('what is here', this.Slide, findDOMNode(this.Slide))
            var widthOfSlides = findDOMNode(this.Slide).offsetWidth
            var timeToMoveOneSlide = 200;
            return {
                widthToScroll: numOfSlidesToScroll * widthOfSlides,
                timeToScroll:  Math.min( (numOfSlidesToScroll*timeToMoveOneSlide), 400)
            }
        }
    }



    handleLeftNav(e){
        // console.log('left clicked', this);
        //getting our right arrow to move forward when clicked//
        const { carouselViewport } = this.refs;
        var { widthToScroll, timeToScroll } = this.widthAndTimeToScroll();
        var newPos = carouselViewport.scrollLeft - widthToScroll;
        var scrollLeft = 'scrollLeft';
        return scrollTo({
            element: carouselViewport, 
            to: newPos, 
            duration: timeToScroll, 
            scrollDirection: scrollLeft,
            callback: this.checkIfSlidesAllTheWayOver,
            context: this
        });
    }

    handleRightNav = (e) =>{
        // console.log('right clicked', this);
        //getting our right arrow to move forward when clicked//
        const { carouselViewport } = this.refs;
        var { widthToScroll, timeToScroll } = this.widthAndTimeToScroll();
        var newPos = carouselViewport.scrollLeft + widthToScroll;
        var scrollLeft = 'scrollLeft';
        var promise = scrollTo({
            element: carouselViewport, 
            to: newPos, 
            duration: timeToScroll, 
            scrollDirection: scrollLeft,
            callback: this.checkIfSlidesAllTheWayOver,
            context: this
        });
        return promise;
       
    }



    // renderSlides() {
    //     return data.map((state)=>{
    //         return (
    //             <Slide
    //             name={state.name}
    //             key={state.abbreviation}
    //             ref = {compSlide=> this.Slide = compSlide}
    //         />);
    //     })
    // }


    render() {

        const {
            allTheWayLeft,
            allTheWayRight
        } = this.state

        //using classNames method to store our classes (nav) for flexibility//
        const navClasses = classNames({
            'carousel-nav': true
        })

        const leftNavClasses = classNames({
            'carousel-left-nav': true, 
            'carousel-nav-disabled': allTheWayLeft
        }, navClasses);

        const rightNavClasses = classNames({
            ' carousel-right-nav': true,
            'carousel-nav-disabled': allTheWayRight
        }, navClasses);
        return( 

            <div className='carousel-container'>
            <button
              className={leftNavClasses}
              onClick={this.handleLeftNav}
              >
                &#60;
            </button>
            <div
             className='carousel-viewport'
              ref='carouselViewport'
              onScroll={this.throttleScroll}
              >
              <div>
              {this.state.items.map(value=>(
                  <div key={value.id} className='image-div'>
                      <img src={value.image_url} alt={value.title} className='images'/>
                  </div>
              ))}
              </div>
            </div>
            <button
              className={rightNavClasses}
              onClick={this.handleRightNav}
              >
                &#62;
            </button>
        
        
        </div>
        
        
        );
    }
}


export default Carousel