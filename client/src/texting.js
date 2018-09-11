import React, {Component} from 'react';
import axios from 'axios';
import './AdminUpload.css';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
// import Dashboard from '../AdminDashboard/Dashboard'
const styles = {
    root: {
      flexGrow: 1,
    },
  };
class AdminTester extends Component{
    state = {
        // title: '',
        // description: '',
        // releaseYear: '',
        // producer: '',
        // category: '',
        // price: '',
        image: '',
        video: '',
        progress: 0
    }
    handleFile = (event) => {
        switch (event.target.name) {
            case 'image':
                this.setState({
                    image: event.target.files[0]
                })
            case 'video':
                this.setState({
                    video: event.target.files[0]
                })
            default:
                null;
        }
        // console.log(this.state)
    }
    // onChange=(event)=>{
    //     switch (event.target.name) {
    //        case 'image':
    //        this.setState({file: event.target.files[0]})
    //        case 'video':
    //        this.setState({file: event.target.files[1]})
    //        break;
    //        default:
    //          this.setState({ [event.target.name]: event.target.value })
    //     }
    // }
    fileUpload = e =>{
        
        let description = this.refs.description.value;
        let title = this.refs.title.value;  
        let price = this.refs.price.value;  
        let category = this.refs.category.value;
        let releaseYear = this.refs.releaseYear.value;  
        let producer = this.refs.producer.value;       
        e.preventDefault()
        const files = new FormData()
        files.append('image', this.state.image);
        files.append('video', this.state.video);
        files.append('title', title);
        files.append('description', description);
        files.append('releaseYear', releaseYear);
        files.append('producer', producer);
        files.append('category', category);
        files.append('price', price);
        axios({
            method: 'post',
            url: 'https://ogenetv.herokuapp.com/movies/add',
            data: files,
            headers: {
                'Content-Type': 'mulTipart/form-data'
            },
            onUploadProgress: (progress) => {
                const { loaded, total } = progress;
                this.setState({
                    progress: Math.round((loaded/total) * 100)
                })
                console.log(this.state.progress)
            }
            
        })
         .then(res =>{
            console.log(res)
        })
          }
    render(){
        const { classes } = this.props;
        // const {name, description, releaseYear, producer, price, category} = this.state
            return(
                <div className={classes.root}>
                <div className="upload-form">
                
                    {/* <Dashboard/> */}
                    <form className='form-control'>
                        <input 
                        type="file" 
                        name='image'
                        onChange={this.handleFile}
                        className='file-input'
                        />
                    <LinearProgress variant="determinate" className='progress-bar' value={this.state.progress} />
                    <div className='admin-form'>
                    <div className='video-upload'>
                        <input 
                        type="file" 
                        name='video'
                        onChange={this.handleFile}
                        className="input-value"
                        />
                    </div>
                    <div className='text-value'>
                        <input
                        type='text'
                        name='title'
                        placeholder="title"
                        ref="title"
                        onChange={this.onChange}
                        className="input-value"
                        
                        />
                        <input
                        type='text'
                        name='releaseYear'
                        placeholder="releaseYear"
                        ref='releaseYear'
                        onChange={this.onChange}
                        className="input-value "
                        
                        />
                        <input
                        type='text'
                        name='description'
                        placeholder="description"
                        ref='description'
                        onChange={this.onChange}
                        className="input-value description-text"
                        
                        />
                    </div>
                    <div className='text-value2'>
                        <input
                        type='text'
                        name='producer'
                        placeholder="producer"
                        ref='producer'
                        onChange={this.onChange}
                        className="input-value"
                        
                        />
                        <input
                        type='text'
                        name='category'
                        placeholder="category"
                        ref='category'
                        onChange={this.onChange}
                        className="input-value"
                        
                        />
                        <input
                        type='text'
                        name='price'
                        placeholder="price"
                        ref='price'
                        onChange={this.onChange}
                        className="input-value"
                        
                        />
                     </div>
                     </div>   
                        <button onClick={this.fileUpload} type="button" className='upload-btn'>Upload</button>
                    </form>
                </div>
                </div>
            );
    }
}
export default withStyles(styles) (AdminTester);