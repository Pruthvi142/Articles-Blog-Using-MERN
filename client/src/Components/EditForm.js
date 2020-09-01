import React, { Component } from 'react'
import {connect } from 'react-redux'
import { startUpdateArticle } from '../Actions/MyAricleAction';

 class EditForm extends Component {
     constructor(props) {
         super(props);
         this.state={
              title:this.props.article?.title,
              body:this.props.article?.body
         }
     }
     handleChange=(e)=>{
         this.setState({[e.target.name]:e.target.value})
     }
     handleSubmit=(e)=>{
         const formdata={
               title:this.state.title,
               body:this.state.body
         }
        const redirect=()=>{
            this.props.history.push("/users/myarticles")
        }
        const id=this.props.article._id
        this.props.dispatch(startUpdateArticle(id,formdata,redirect))

     }
     handleBack=()=>{
         this.props.history.push("/users/myarticles")
     }
     
    render() {
        console.log("edit form",this.props.article)
        return (
            <div>
              <div className="row">
                  <div className="col-md-4"></div> 
                  <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" value={this.state.title} className="form-control" onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="body" value={this.state.body} className="form-control" onChange={this.handleChange}/>
                        </div>
                        <input type="submit" value="submit"  className="btn btn-primary"/>
                    </form>  
                    </div> 
             </div>
            <button type="button" class="btn btn-primary" onClick={this.handleBack}>Back</button> 
            </div>
        )
    }
}
const mapStateToProps=(state,props)=>{
    return{
        article:state.myArticles.find(ele=>ele._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(EditForm)
