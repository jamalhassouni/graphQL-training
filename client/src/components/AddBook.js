import React, { Component } from 'react';
import {graphql,compose} from "react-apollo";
import {getAuthorsQuery,addBookMutation,getBooksQuery} from "../queries/queries";


class AddBook extends Component {
	constructor(props){
		super(props);
        this.state ={
        	name:"",
        	genre:"",
        	authorId:""
        }
	}
  
    displayAuthors(){
    	var data = this.props.getAuthorsQuery;
    	 if(data.loading){
    	 	return <option disabled>Loading Authors...</option>
    	 }else{
    	    return data.authors.map(author =>(
    	      <option key={author.id} value={author.id}>{author.name}</option>
    	    ))	
    	 }
    }

    submitForm =(e) => {
      const {name,genre,authorId} = this.state;

       e.preventDefault();
       this.props.addBookMutation({
       	 variables:{
       	 	name:name,
       	 	genre:genre,
       	 	authorId:authorId
       	 },
       	 refetchQueries:[{query:getBooksQuery}]
       });
       this.setState({name:"",genre:"",authorId:""});
    }

  render() {
   const {name,genre,authorId} = this.state;

    return (
     <form id="add-book" onSubmit={this.submitForm}>

      <div className="field">
      <label>Book Name: </label>
      <input value={name}  type="text" onChange={(e) => this.setState({name:e.target.value})} />
      </div>

      <div className="field">
      <label>Genre: </label>
      <input value={genre} type="text" onChange={(e) => this.setState({genre:e.target.value})}/>
      </div>

      <div className="field">
      <label>Author: </label>
     <select value={authorId} onChange={(e) => this.setState({authorId:e.target.value})}>
     <option> Select author</option>
     {this.displayAuthors()}
     </select>
      </div>

      <button>+</button>

     </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
  graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);
