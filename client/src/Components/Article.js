import React, { Component } from 'react'

import {startGetArticle} from '../Actions/ArticlActions'
import {selectUser} from '../selectors/alluser'
import{selectLikeUser} from '../selectors/selectLikeUser'
import  {connect} from 'react-redux'
import { startGetAllUsers } from '../Actions/userAction'
import {BsFillChatDotsFill,BsFillPersonFill} from "react-icons/bs";
import moment from 'moment'
import { startUserLike,startUesrDislike } from '../Actions/LikesAction'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar'

import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Article extends Component {
    constructor(props) {
        super(props)
        this.state={  
            sort: "",
         
        }
    }
    

  handlechange=(e)=>{
      this.setState({[e.target.name]:e.target.value})
      console.log("sort" ,e.target.value)
  }


  handlesort=()=>{

  }
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
        
       
            this.props.dispatch(startGetArticle())
            this.props.dispatch(startGetAllUsers())
       
      

  }
    render() {
    
        console.log("all users in component",this.props.allusers)
        return (
           
            <div>
              
              
                  <nav className="navbar navbar-expand-lg">
                 
                  <form className="form-inline">
                  <div class="form-row">
                      <div className="col">
                      <button type="button" className="nav-item" className="btn btn-outline-success" onClick={this.handlePost}>ADD POST</button>
                    
                      </div>
                      <div className="col">
                      <input type="text"  className="nav-link" class="form-control mr-sm-2"value ={this.state.sort} name="sort" onChange={this.handlechange} placeholder=" Search By Title" aria-label="Search" style={{width:"500px"}}/>
                      </div>
                      </div>
                </form>
              
                  </nav>
              
       
                     
                {
                    
                this.props.article.filter(art=>art.title.includes(this.state.sort)).map(ele=>{
                       let names=selectUser(this.props.allusers,ele.userId)
                       let likeUser=selectLikeUser(this.props.user,ele.likes)
                         let profile=names?.profile
                         let userid=names?._id
                        
                        return(
                            <div className="card w-75">
                             <div className="card-body">
 <h2 className="card-title"> Title:{ele.title} </h2>
                       <p className="h5">{Object.keys(this.props.user).length!==0 ?(<div>posted by<Link to ={`/users/profile/${userid}`}>{names?.username} </Link>{profile?<img  class="rounded-circle"  src={ `http://localhost:7000/${profile}`} width="20" height="20"/>:<Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={names?.username} size="25" round={true} textSizeRatio={1.75} />}</div>):(<div> posted by {names?.username} {profile?<img  class="rounded-circle"  src={ `http://localhost:7000/${profile}`} width="20" height="20"/>:<Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={names?.username} size="25" round={true} textSizeRatio={1.75} />}</div>)}</p>
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
