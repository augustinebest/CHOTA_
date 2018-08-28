import React, {Component} from 'react';
// import './search-results.css';
import Footer from './components/footer';
import Nav from './components/nav-bar.js';
import SearchBar from './components/search-bar';
// import Trends from './components/trends';
import SearchResults from './components/search-result.js';
// import {withRouter} from 'react-router-dom';
// import { browserHistory } from 'react-router';
import './search-results.css';
import axios from 'axios'


const API_KEY = '56f0450d2729d1d9861d643496069047'


class SearchResult extends Component {

    constructor(){
        super();
   this.state = {
        recipes: []
    }
}

// getdata = async (event) =>{
//     const recipeName = event.target.elements.recipeName.value;
//     alert('hello')
//     event.preventDefault();//to prevent web page default method ie auto reloading
//     const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`)
//     const data = await api_call.json();
//     this.setState({recipes: data.recipes})
//     console.log(this.state.recipes)
//     // this.props.history.push("/SearchResults")
//     // this.props.browserHistory.push('/SearchResults')
// }



// Hanle our search feature functionality

handleChange = (e) => {
    axios.get(`https://chota1.herokuapp.com/place/search/${e.target.value}`)
        .then(res => {
            console.log(res.data)
            this.setState({
                recipes: res.data
            })
        })
}




    render() {
        // let { recipes } = this.state;

        return(
            <div className='wrapper'>
            <Nav/>
            <input type="text" className='searchBar' name='recipeName' onChange={this.handleChange} />
                {/* <img src={search} alt='image' className='search-icon'/> */}
                
            <div className='detail-body'>
                <div className='body-div'>
                    <div className='Search-term'> trap House</div>
                    <div className='Search-term'> enugu </div>
                    <SearchResults items={this.state.recipes}/>
                </div>
            </div>
           <Footer/>
        </div>
        )
    }
}



export default SearchResult