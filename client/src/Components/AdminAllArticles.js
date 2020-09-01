import React, { Component } from 'react'
import {startGetArticle } from '../Actions/ArticlActions'
import {startAdminDeleteArticle} from '../Actions/AdminAction'
import {selectUser} from '../selectors/alluser'
import  {connect} from 'react-redux'
import { startGetAllUsers } from '../Actions/userAction'
import {BsFillChatDotsFill,BsHeart} from "react-icons/bs";
import moment from 'moment'
class Article extends Component {
    constructor(props) {
        super(props);
        this.state={
            body:""
        }
    }
    

  componentDidMount(){
    this.props.dispatch(startGetArticle())
         
this.props.dispatch(startGetAllUsers())
      

  }


    handlePost=(e)=>{
        if(Object.keys(this.props.user).length==0)
        {
            const confirm=window.confirm("you need to log in")
            if(confirm)
            {
                window.location.href='/user/login'
            }
        }
        else{
            window.location.href="/user/AddArticle"
        }

    }
DeleteArticle=(id)=>{
    
        this.props.dispatch(startAdminDeleteArticle(id))
        // window.location.reload(false) 

}
showComent=(id)=>{
    this.props.history.push(`/admin/showcomment/${id}`)
}
    AddComment=(id)=>{

   
        console.log(this.props.allusers.map(ele=>ele._id==id))
        if(Object.keys(this.props.user).length==0)
        {
            const confirm=window.confirm("you need to log in")
            if(confirm)
            {
                window.location.href='/user/login'
            }
        }
        else{
             this.props.history.push(`/article/comment/${id}`)
        }


    }
    componentDidMount(){
        this.props.dispatch(startGetArticle())
       this.props.dispatch(startGetAllUsers())
    }
    render() {
        let names={}
        // console.log("article in component",this.props.article)
        console.log("all users in component",this.props.allusers)
        return (
           
            <div>
                <button type="button" class="btn btn-secondary" onClick={this.handlePost}>ADD POST</button>
                {
                    this.props.article.map(ele=>{
                       let names=selectUser(this.props.allusers,ele.userId)
                         console.log( "name",names?.username)
                        return(
                            <div class="card w-75">
                             <div class="card-body">
                        <h5 class="card-title"> Title:{ele.title} </h5>
                        <p className="h5">posted by {names?.username} </p>
                         <p className="card-subtitle mb-2 text-muted" >updated on {moment(ele.createdAt).fromNow()}</p> 
                             <p class="card-text">{ele.body}</p>
                     <div> <button type="button"class="btn btn-danger" onClick={()=>{this.DeleteArticle(ele._id)}}>Delete</button>  <button type="button" className="btn btn-light" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button> </div><br/>
                       
                            </div>
                           </div>
                        )
   
                    })
                }
                  
           </div> 
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.users,
        article:state.articles,
        allusers:state.allUsers
    }
}

export default connect(mapStateToProps)(Article)
