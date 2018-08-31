import React, {Component} from 'react'
import axios from 'axios'

class Upload extends Component {

    state ={
        selectedFile : null 
    }

    selectedPhotoHandler = event =>{
        // console.log(event.target.files[0]);
        this.setState({
            selectedFile : event.target.files[0]
        })
    }

    fileUploadHandler = () =>{
        const fd  = new FormData();
        fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
        axios.post("https://chota1.herokuapp.com/place",fd , {
            onUploadProgress : ProgressEvent => {
                console.log('Upload pro' + Math.round(ProgressEvent.loaded/ProgressEvent.total * 100) + "%")
            }
        })
        .then(res =>{
            console.log(res);
        })
    }
    render(){
        return (
            <div>
                <input style={{display:'none'}} 
                type = 'file'
                onChange = {this.selectedPhotoHandler}
                ref ={ fileInput => this.fileInput = fileInput}
                />
                <button onClick ={ () => this.fileInput.click()} > Pick File </button>
                <button onClick = {this.fileUploadHandler}></button>
            </div>
        )
    }
}
export default Upload 