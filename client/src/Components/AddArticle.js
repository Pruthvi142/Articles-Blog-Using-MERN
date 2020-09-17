import React, { Component } from 'react'
import { startArticlePost } from '../Actions/ArticlActions';
import {connect} from 'react-redux'
import { startGetUser } from '../Actions/userAction';

 class AddArticle extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:"",
            body:""
        }
        
    }
    componentDidMount(){
         this.props.dispatch(startGetUser())
    }
    handleChange=(e)=>{


        this.setState({[e.target.name]:e.target.value})
        // this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
      const formdata={
              title:this.state.title,
              body:this.state.body
        }
     
        const redirect=()=>{
            this.props.history.push('/')
        }
        this.props.dispatch(startArticlePost(formdata,redirect))
        this.setState({
            title:"",
            body:""
        })
    }
    handleBack=()=>{
        window.location.href='/'
    }
    
  
    render() {
        console.log("add user",this.props.user)
        //    if(Object.keys(this.props.user).length==0)
        //    {
        //     this.props.history.push('/user/login')
        //    }
        return (
            <div className="container"> 
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control" name="title" onChange={this.handleChange}/>
                        </div>    
                        <div className="form-group">
                          <label>Description:</label> 
                          <textarea className="form-control" name="body" onChange={this.handleChange}/> 
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
const mapStateToProps=(state)=>{
    console.log("sate",state.users)
    return{
        user:state.users,
    }
}
export default connect(mapStateToProps)(AddArticle)