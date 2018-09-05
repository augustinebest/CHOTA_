import React, {Component} from 'react';
import AdminNavBar from './components/admin-navbar';
import './pin-location.css';
import axios from 'axios';


class PinLocation extends Component{
    state = {
        image: null,
        name: '',
        description: '',
        categoryId: '',
        items: [],
        progress : 0
    }


    componentDidMount(){
        axios.get('https://chota1.herokuapp.com/category')
        .then(res=>{
            // console.log(res.data)
            this.setState({items: res.data})
        })
    }

onSubmission(e){
    e.preventDefault();
    let { name, image, description, categoryId } = this.state;

    let data = new FormData();
    data.append('name', name);
    data.append('image', image);
    data.append('description', description);
    data.append('categoryId', categoryId)

    axios({
        method: 'post',
        url: 'https://chota1.herokuapp.com/place',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (prog) => {
            let { loaded, total } = prog;
            this.setState({
                progress: Math.round((loaded/total) * 100)
            })
        }
        
        
    })
    .then(res => {
        console.log(res)
    })

}


    handleCheck = (e) => {
        this.setState({
            categoryId: e.target.value
        })
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleFile = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    


    render(){
            return(
                <div style={{backgroundColor:' #E5E5E5', height:'100%'}}>
                    <AdminNavBar/>
                    <div id='addingLocation'>
                    <form encType="multipart/form-data" onSubmit={this.onSubmission.bind(this)}> 
                    <input 
                        type="file" 
                        name='image'
                        onChange={this.handleFile}
                        className='file-input'
                        />
                     <input
                        type='text'
                        name='description'
                        placeholder="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        className="input-value description-text"
                        />
                     <input
                        type='text'
                        name='name'
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        className="input-value description-text" 
                        />
                     {this.state.items.map(value =>(    
                         <div key={value}>            
                    <input
                         type="radio" 
                         id="component" 
                         name="categoryId" 
                         value={value._id}
                         onChange={this.handleCheck}/>
                    <label For="component">{value.categoryName}</label>
                </div>
                      ))}
                     <button type="submit" id='submitButton'>Pin Location</button>
                <progress value = {this.state.progress} max = '100' className='progressBar'/>
                    </form>
                        
                </div>
                </div>
            );
        }
}



export default PinLocation