import React , {Component}from 'react';
import AdminNavBar from './components/admin-navbar';
import './pin-location.css';
import {storage} from './Firebase';
import {config} from './Firebase/index';
import firebase from 'firebase';
import 'firebase/database';
import Note from '../src/Notes/note';
import Noteform from '../src/NoteForm/noteform'


class PinLocation extends Component {
    constructor(props){
        super(props);
        this.state = {
            image:'null',
            url:'',
            progress: 0,
            notes:[
               
            ],
        }
        this.app = firebase.initializeApp(config)
        this.db = this.app.database().ref().child('notes');
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.addNote = this.addNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
    }

    componentWillMount(){
        const previousNotes = this.state.notes;
        this.database.on('child_added',snap => {
            previousNotes.push({
                id :snap.key,
                noteContent : snap.val().noteContent,
            })
            this.setState({
                notes: previousNotes
            })
        })
        this.database.on('child_removed', snap =>{
            for(var i=0; i < previousNotes.length; i++ ){
                if(previousNotes[i].id === snap.key){
                    previousNotes.splice(i,1);
                }
            }
            this.setState({
                notes: previousNotes
            })
        })
    }

    addNote(note){
         //push note into array 
        //  const previousNotes = this.state.notes
        //  previousNotes.push({id: previousNotes.length +1, noteContent : note});
        //  this.setState({
        //    notes : previousNotes
        //  })

        this.database.push().set({noteContent : note});
        
            }

    removeNote(noteId){
        console.log('from the parent:' + noteId)
        this.database.child(noteId).remove();

    }

    handleChange = e =>{
        if(e.target.files[0]){
            const image = e.target.files[0]
            this.setState( () => ({image}))
        }
    }

    handleUpload = e =>{
        const {image} = this.state
      const  uploadTask =   storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', (snapshot) => {
        //progress function
        const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        this.setState({progress})
      },(error) => {
          // error message
          console.log(error)
      }, () =>{
            //complete function...
            storage.ref('images').child(image.name).getDownloadURL().then(url =>{
                console.log(url)
                this.setState({url})
            })
        })
}
    

    render(){
        return(
            <div style={{backgroundColor:' #E5E5E5', height:'100%'}}>
                <AdminNavBar/>
                <progress value ={this.state.progress} max = '100' />
                <div id='addingLocation'>
                        <div className='locationImage'>
                        <img  className = 'ImageContent'src = {this.state.url} alt = 'Uploaded Images'/>
                        </div>
                    {/* <div className='locationImage'></div> */}
                    <input type='file' onChange = {this.handleChange}  ref ={ fileInput => this.fileInput = fileInput}/> 
                    <button id='add' onClick ={ () => this.fileInput.click()}>+</button>
                    {/* <span style={{}}><p>add location</p></span> */}
                </div>
                
                <div id='reviewPortion'>
                <div className = 'notesBody'>
                {
                    this.state.notes.map((note) => {
                        return (
                            <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote = {this.removeNote}/>
                        )
                       
                    })
                   
                }
                </div>
                </div>
                <div id='ratingPortion'>
                    <div className='notesFooter'>
                        <Noteform addNote = {this.addNote}/>
                    </div>
                </div>
                    <div id='locationComandBtn'>
                        <button id='pinLocation' onClick = {this.handleUpload}>PIN</button>
                        <button id='cancelLocation'>CANCEL</button>
                    </div>
                
            </div>
        );
    }
    
}



export default PinLocation