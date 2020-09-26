import React, { Component } from 'react'
import {connect} from 'react-redux'
import  { startAddComment } from '../Actions/commentAction'

 class AddComment extends Component {

    constructor(props) {
        super(props);
        this.state={
            body:""
        }
        
    }
    
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formdata={
            body:this.state.body
        }
        const redirect=()=>{
            this.props.history.push("/")
        }
   console.log("cmt form",formdata)
        const id=this.props.article._id
        this.props.dispatch(startAddComment(id ,formdata,redirect))

    }


    handleBack=()=>{
        window.location.href='/'
    }
    
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label>Add AddComment</label>
                    <textarea name="body" value={this.state.body} onChange={this.handleChange} className="form-control" required/> 
                    </div>
                    <input type="submit" className="btn btn-primary"/>
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
    
        article:state.articles.find(ele=>ele._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(AddComment)

