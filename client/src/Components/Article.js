import React, { Component } from 'react'

import {startGetArticle} from '../Actions/ArticlActions'
import {selectUser} from '../selectors/alluser'
import{selectLikeUser} from '../selectors/selectLikeUser'
import  {connect} from 'react-redux'
import { startGetAllUsers } from '../Actions/userAction'
import {BsFillChatDotsFill,BsHeart} from "react-icons/bs";
import moment from 'moment'
import { startUserLike,startUesrDislike } from '../Actions/LikesAction'
import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Article extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state={  liked: true
    //     }
    // }
    

  


    handlePost=(e)=>{
        if(Object.keys(this.props.user).length==0)
        {
                 Swal.fire({
                title: 'you need to log in?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes,  log in'
              }).then((result) => {
                if (result.value) {
                  
                    window.location.href='/user/login'
                  
                }
              })
        }
        else{
            window.location.href="/user/AddArticle"
        }

    }
// DeleteArticle=(id)=>{
//     this.props.dispatch(startAdminDeleteArticle(id))
//     // window.location.reload(false)

// }
showComent=(id)=>{
    this.props.history.push(`/article/showcomment/${id}`)
}
    AddComment=(id)=>{

   
        console.log(this.props.allusers.map(ele=>ele._id==id))
        if(Object.keys(this.props.user).length==0)
        {
            Swal.fire({
                title: 'you need to log in?',
               
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes,  log in'
              }).then((result) => {
                if (result.value) {
                  
                    window.location.href='/user/login'
                  
                }
              })
        }
        else{
             this.props.history.push(`/article/comment/${id}`)
        }


    }

    handleLike=(id)=> {
      
    
        if(Object.keys(this.props.user).length==0)
          {  
            Swal.fire({
                title: 'you need to log in?',
               
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes,  log in'
              }).then((result) => {
                if (result.value) {
                  
                    window.location.href='/user/login'
                  
                }
              })
        }
        else{
             this.props.dispatch(startUserLike(id))
            //  window.location.reload(false)
           }
     }
      handleDislike=(id)=>
      {
          console.log("dis",id)
          this.props.dispatch(startUesrDislike(id))
        //    window.location.reload(false)
      }

      componentDidMount(){
         if(this.props.article.length==0)
         {
            this.props.dispatch(startGetArticle())
         }
      
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
                       let likeUser=selectLikeUser(this.props.user,ele.likes)
                         console.log( "likes",likeUser)
                        return(
                            <div class="card w-75">
                             <div class="card-body">
                        <h2 class="card-title"> Title:{ele.title} </h2>
                        <p className="h5">posted by {names?.username} </p>
                         <p className="card-subtitle mb-2 text-muted" >posted on {moment(ele.createdAt).fromNow()}</p> 
                             <p class="card-text">{ele.body}</p>
                      {Object.keys(this.props.user).length!==0 ?(<div>{this.props.user._id==likeUser?(<div>  you liked{ele.likes.length} <button type="button" class="btn btn-light"  onClick={()=>{this.handleDislike(ele._id)}}> <h6 ><FontAwesomeIcon icon="thumbs-down" /> dislike</h6></button>  <button type="button" className="btn btn-light"  onClick={()=>{this.AddComment(ele._id)}}  > AddComment</button> <button type="button" className="btn btn-light" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button>     </div>):(<div>  {ele.likes.length} <button type="button" class="btn btn-light" onClick={()=>{this.handleLike(ele._id)}}> <h6 ><FontAwesomeIcon icon="thumbs-up" /> like</h6></button> <button type="button"class="btn btn-light" onClick={()=>{this.AddComment(ele._id)}}>  AddComment</button>  <button type="button" className="btn btn-light" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button>     </div>)}</div> ):(<div> {ele.likes.length}   <button type="button" class="btn btn-light"  onClick={()=>{this.handleLike(ele._id)}} ><h6 ><FontAwesomeIcon icon="thumbs-up" /> like</h6></button> <button type="button"class="btn btn-light" onClick={()=>{this.AddComment(ele._id)}}>  AddComment</button> <button type="button" className="btn btn-light" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button></div>)}
                       
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
