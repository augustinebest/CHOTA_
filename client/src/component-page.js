import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Nav from './components/nav-bar.js';
import Footer from './components/footer';
import './component-page.css';
import  Loader from './components/Loader';



// const API_KEY = '56f0450d2729d1d9861d643496069047'

class ComponentPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: [],
            loader:false
        }
    }

    
    componentDidMount(){
        this.setState({
            loading:true
        })
        axios.get(`https://chota1.herokuapp.com/category/get/${this.props.match.params.categoryName}`)
        .then(res=>{
            console.log(res.data.placeId)
            this.setState({item: res.data.placeId, loading:false
            })
        })
    }

    render(){
        // console.log(this.props.match.params)
        const{loading} =this.state
        if (sessionStorage.getItem('user')){
            return(
                <div>
                     <Nav/>
                     <div id='categoryid'><h3>{this.props.match.params.categoryName}</h3></div>
                     <div id='placeViewPart'>
                     {
            loading &&
            <div style={{position: 'relative', top: '150px', left: '150px'}}>
                <Loader />
            </div>
        }
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
                    <span> space for rating</span>
                    <p>Gps location of place</p>
                    </div>
                </div>
                    ))}
                    </div>
                    <Footer/>
                </div>
            );
        }
        else {
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
                    <span> space for rating</span>
                    <p>Gps location of place</p>
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