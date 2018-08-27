import React, {Component} from 'react';
import './search-bar.css';
import {Link} from 'react-router-dom';
// import {Button, Jumbotron} from "react-bootstrap"


class SearchBar extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
    if (this.props.where == "home"){
    return(
       <form onSubmit={this.props.getData}>
           <input type="text" className='searchBar' name='recipeName'></input>
          <Link to='/SearchResults'><button type='submit' className='searchButton'> Search </button></Link>
          {/* <img src={search} alt='image' className='search-icon'/> */}
       </form>
    )
    }
       else{
        return(
            <form onSubmit={this.props.getData}>
                <input type="text" className='searchBar' name='recipeName'></input>
               <button type='submit' className='searchButton'> Search </button>
               {/* <img src={search} alt='image' className='search-icon'/> */}
            </form>
         )
       }
    }
}



export default SearchBar