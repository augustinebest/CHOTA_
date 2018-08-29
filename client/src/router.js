import React from 'react';
import { BrowserRouter, Route, Switch ,} from 'react-router-dom';
import Home from './home';
import SearchResult from './search-results';
import PlaceDetails from './place-details';
import About from './about';
import Advertise from './advertise';
import Privacy from './privacy';
import Contact from './contact';
import SelectInterests from './select-interests';
import Login from './components/LoginPage';
import Signup from './components/SignupPage'
import PinLocation from './pin-location';
import PinDetails from './pin-details';
import PinFeed from './pin-feed';
import Notifie from './notification';
import Profile from './profile';
import Setting from './setting';
import Friends from './friends';
import Error from './error';
import ImageUpload from './components/ImageUpload'
// import Facebooklogin from './components/Facebooklogin.js'
// import searchResults from './search-results';
// import SearchBar from './components/search-bar';

const Router = () => {
    return (
      <div>
      <BrowserRouter>
         <Switch>
          
          <Route path='/' component={Home} exact/>
          <Route path='/SearchResults' component={SearchResult}/>
          <Route path='/PlaceDetails/:id' component={PlaceDetails}/>
          <Route path='/About' component={About}/>
          <Route path='/Advertise' component={Advertise}/>
          <Route path='/Privacy' component={Privacy}/>
          <Route path='/Contact' component={Contact}/>
          <Route path='/SelectInterests' component={SelectInterests}/>
          <Route path='/Login' component={Login}/>
          <Route path='/Signup' component={Signup}/>
          <Route path='/ImageUpload' component={ImageUpload}/>
          <Route path='/PinLocation' component={PinLocation}/>
          <Route path='/PinDetails/' component={PinDetails}/>
          <Route path='/PinFeed' component={PinFeed}/>
          <Route path='/Notifie' component={Notifie}/>
          <Route path='/Profile' component={Profile}/>
          <Route path='/Setting' component={Setting}/>
          <Route path='/Friends' component={Friends}/>
          {/* <Route path="/Facebook" component = {Facebooklogin}/> */}
          {/* <Route path='/resultFromSearch' component={SearchBar}/> */}
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
  </div>
    );
  }

export default Router