import React, {Component} from 'react';
import './search-results.css';
import Footer from './components/footer';
import Nav from './components/nav-bar.js';
import SearchBar from './components/search-bar';
// import Trends from './components/trends';
import SearchResults from './components/search-result.js'



const API_KEY = '56f0450d2729d1d9861d643496069047'


class SearchResult extends Component {

    state = {
        recipes: []
    }

getdata = async (event) =>{
    const recipeName = event.target.elements.recipeName.value
    event.preventDefault();     //to prevent web page default method ie auto reloading
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`)
    const data = await api_call.json();
    this.setState({recipes: data.recipes})
    console.log(this.state.recipes)

}




    render() {
        return(
            <div className='wrapper'>
            <Nav/>
            <SearchBar getData={this.getdata}/>
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