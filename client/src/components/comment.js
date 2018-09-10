import React from 'react';
import axios from 'axios';
	// import prophoto from './account-circle.png'
import './comment.css';

console.clear();

const Title = ({commentCount}) => {
    return (
		<div>
			<div>
				<h1><i className='fa fa-comments'></i>&nbsp; Review &nbsp; ({commentCount})</h1> <br />
			</div>
		</div>
    );
}


	const CommentForm = ({addComment}) => {
		let input;
    return (
		<form onSubmit={(e) => {
			e.preventDefault();
			addComment(input.value);
			input.value = '';
		}}>
			<input className="form-control col-md-6" placeholder='Enter Comments here' ref={node => {
				input = node;
			}} />
		<br />
		</form>
    );
};



const Comment = ({comment}) => {
	// const name = sessionStorage.getItem('username');
	return (
		<div>
			  {this.state.items.map(value =>(
		<div key={value} className='commentBody'>
			 
			<div className='commentAvatar'>
				{/* <img alt='' src={prophoto} className='commentImage'/> */}
			</div>
			{/* <span className='commentName smoke'> {name} </span> */}
			<hr />
			<span className='commentComment smoke'> {comment.text} </span>
			<span className='commentDate smoke'>Date</span>
			<hr />
			<span className='commentStars'><i className='fa fa-star'></i><span id='star'></span></span>
			<span className='commentSupport smoke'>
				{/* {this.value} {this.person} */}
				Supports this
			</span>
			</div>
			     ))}
		</div>
	);
}

// Map through the comments
// const CommentList = ({comments}) => {
// 	const commentNode = comments.map((comment) => {
// 		return (<Comment comment={comment} key={comment.id}/>)
// 	});
// 	return (<div className='commentgroup' style={{marginTop:'30px'}}>{commentNode}</div>);
// }

  // Contaner Component
  // Comment Id
  window.id = 0;


class CommentComp extends React.Component{
	constructor(props){
		super(props);
		// Pass props to parent class
		// Set initial state
		this.state = {
			data: []
		}
	// this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
	this.apiUrl = 'https://chota1.herokuapp.com/feedback'
}

    // Lifecycle method
    componentDidMount(){
      // Make HTTP reques with Axios
		axios.get(this.apiUrl)
        .then((res) => {
					console.log(res.data.review)
          // Set state with result;
			this.setState({data:res.data});
        });
    }
    // Add comment handler
    addComment(val){
      // Assemble data
		const comment = {commentBody: val}
      // Update data
		axios.post(this.apiUrl, comment)
        .then((res) => {
					console.log(res)
            // this.state.data.push(res.data);
            // this.setState({data: this.state.data});
        });
    }


    render(){
      // Render JSX
		return (
			<div style={{padding: 30}}>
				<Title commentCount={this.state.data.length}/>
				<CommentForm addComment={this.addComment.bind(this)}/>
				{/* <CommentList comments={this.state.data} /> */}
			</div>
		);
    }
}

export default CommentComp;
