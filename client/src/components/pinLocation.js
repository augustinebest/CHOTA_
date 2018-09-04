import React, { Component } from 'react'
// import  Loader from './Loader'

class PinLocation extends Component {
    constructor(props){
        super(props)

        this.state = {
            name : '',
            description : '',
            image : '',
            category : ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
 
        let { name, description, image, category } = this.state;
 
        let course = new FormData();
        course.append('name', name);
        course.append('description', description);
        course.append('image', image);
        course.append('category', category);
 
        try {
            // statements
             axios({
                   method: 'post',
                   url: 'https://chota1.herokuapp.com/place',
                   data: course,
                 headers: {
                     'Content-Type': 'multipart/form-data'
                 },
                 onUploadProgress: (progressEvent) => {
                     const { loaded, total } = progressEvent;
                     this.setState({
                         progress: Math.round((loaded/total) * 100)
                     }, () => console.log((loaded/total)*100))
                 }
             })
             .then(res => {
                if(res){
                    console.log(res)
                }else {
                    alert('Error in network connection, try again');
                }
             })
             .then(err => {
                 console.log(err);
                 
             })
        } catch(e) {
            // statements
            console.log(e);
            
        }
 
 
    }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default  PinLocation
