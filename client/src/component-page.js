import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from './components/nav-bar.js';
import Footer from './components/footer';
import './component-page.css';
import StarRating from './components/star-rating';
import View from './components/view.svg'




class ComponentPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: []
        }
    }

    
    componentDidMount(){
        axios.get(`https://chota1.herokuapp.com/category/get/${this.props.match.params.categoryName}`)
        .then(res=>{
            console.log(res.data.placeId)
            this.setState({item: res.data.placeId
            })
        })
    }

    render(){
        // console.log(this.props.match.params)
        if (sessionStorage.getItem('user')){
            const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return(
                <div>
                     <Nav/>
                     <div id='categoryid'><h3>{this.props.match.params.categoryName}</h3></div>
                     <div id='placeViewPart'>
                    {this.state.item.map(value =>(
                <div key={value}  className='placediv'>
                    <div className='placeImageDiv'>
                    <Link to ={{pathname:`/PlaceDetails/${value._id}`,
                               state: {place: value.name}}}>
                            <img src={value.image} alt={value.name} className='placesImage'/> 
                    </Link>
                    </div>
                    <div className='placeDetailDiv' >
                    <h4>{value.name}</h4>
                    <span>
                    <StarRating/>
                    </span>
                    <div>
                        <img src={View} alt='' id='viewIcon'/>{value.view}
                    </div>
                    <div>
                        {(new Date(value.date)).toLocaleDateString('en-US', DATE_OPTIONS)}
                    </div>
                    </div>
                </div>
                    ))}
                    </div>
                    <Footer/>
                </div>
            );
        }
        else {
            const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            return(
                <div>
                     <Nav/>
                     <div id='categoryid'><h3>{this.props.match.params.categoryName}</h3></div>
                     <div id='placeViewPart'>
                    {this.state.item.map(value =>(
                <div key={value}  className='placediv'>
                    <div className='placeImageDiv'>
                    <Link to='/Login'>
                            <img src={value.image} alt={value.name} className='placesImage'/>
                    </Link>
                    </div>
                    <div className='placeDetailDiv' >
                    <h4>{value.name}</h4>
                    <span>
                    <StarRating/>
                    </span>
                    <div>
                        <img src={View} alt='' id='viewIcon'/>{value.view}
                    </div>
                    <div>
                        {(new Date(value.date)).toLocaleDateString('en-US', DATE_OPTIONS)}
                    </div>
                    </div>
                </div>
                    ))}
                    </div>
                    <Footer/>
                </div>
            );
        }
       
        }
   
    }


export default ComponentPage