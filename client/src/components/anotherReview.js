import React,{Component} from 'react';
import {database} from '../Firebase';
import 'firebase/database';
// import {Navbar, Nav, NavItem,} from "react-bootstrap";
// import logo from './logo_dark.png';
import Note from '../Notes/note';
import Noteform from '../NoteForm/noteform'

class Another extends Component {
    constructor(props){
        super(props);
        this.state = {
            // image:'null',
            // url:'',
            // progress: 0,
            notes: [
                // {id : 1, noteContent: 'Note 1 here!'},
                // {id : 2, noteContent: 'Note 2 here!'},
            ],
               
        }
        //  this.app = firebase.initializeApp(config)
        this.db = database.ref().child('notes');
        // this.handleChange = this.handleChange.bind(this)
        // this.handleUpload = this.handleUpload.bind(this)
        this.addNote = this.addNote.bind(this)
        this.removeNote = this.removeNote.bind(this)
    }

    componentWillMount(){
        const previousNotes = this.state.notes;
        //DataSnapShot
        
        this.db.on('child_added',snap => {
            previousNotes.push({
                id :snap.key,
                noteContent : snap.val().noteContent,
            })
            this.setState({
                notes: previousNotes
            })
        })
        this.db.on('child_removed', snap =>{
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

       // this.state.notes.push(note);

       this.db.push().set({noteContent : note});
       
           }

            removeNote(noteId){
                // console.log('from the parent:' + noteId)
                this.db.child(noteId).remove();
        
            }

    render(){
        return(
            <div style = {{marginBottom: '120px'}}>
           
                 <div className = 'notesBody'>
                {
                    this.state.notes.map((note) => {
                        return (
                            <Note noteContent={note.noteContent} noteId={note.id} key={note.id} removeNote = {this.removeNote}/>
                        )
                       
                    })
                   
                }
                </div>
                <div className='notesFooter'>
                        <Noteform addNote = {this.addNote}/>
                    </div>
            </div>
        )
    }
}

export  default Another