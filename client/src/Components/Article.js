import React, { Component } from 'react'

import {startGetArticle} from '../Actions/ArticlActions'
import {selectUser} from '../selectors/alluser'
import{selectLikeUser} from '../selectors/selectLikeUser'
import  {connect} from 'react-redux'
import { startGetAllUsers, startGetUser } from '../Actions/userAction'
import {BsFillChatDotsFill,BsFillPersonFill} from "react-icons/bs";
import moment from 'moment'
import { startUserLike,startUesrDislike } from '../Actions/LikesAction'
import {Link} from 'react-router-dom'
import Avatar from 'react-avatar'
import ReadMoreReact from 'read-more-react'
import './main.css'

import Swal from 'sweetalert2'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Article extends Component {
    constructor(props) {
        super(props)
        this.state={  
            search: "",
            count:2
         
        }
    }
    

  handlechange=(e)=>{
      this.setState({[e.target.name]:e.target.value})
      console.log("sort" ,e.target.value)
  }


  handleView=()=>{
      
      this.setState((prevState)=>{
        return{
         count:prevState.count+2
        }
       
    })

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
            // this.props.dispatch(startGetUser())
       
      

  }
//   componentDidUpdate(){
//     this.props.dispatch(startGetArticle())
//   }
    render() {
    
        console.log("all users in component",this.props.user)
        return (

           
            <div style={{marginLeft:"20px"}}>
             
              
                  <nav className="navbar navbar-expand-lg">
                 
                  <form className="form-inline">
                  <div class="form-row">
                      <div className="col">
                      <button type="button" className="nav-item" className="btn btn-outline-success" onClick={this.handlePost}>ADD POST</button>
                    
                      </div>
                      <div className="col">
                      <input type="text"  className="nav-link" class="form-control mr-sm-2"value ={this.state.search} name="search" onChange={this.handlechange} placeholder=" Search By Title" aria-label="Search" style={{width:"500px"}}/>
                      </div>
                      </div>
                </form>
              
                  </nav>
              
       
                     
                {
                    
                this.props.article.slice(0,this.state.count).filter(art=>art.title.includes(this.state.search)).map(ele=>{
                       let names=selectUser(this.props.allusers,ele.userId)
                       let likeUser=selectLikeUser(this.props.user,ele.likes)
                         let profile=names?.profile
                         let userid=names?._id
                        
                        return(
                            <div className="card mb-3 shadow-lg p-3 bg-white rounded" style={{width:1000}} >
                             <div className="card-body">
 <h2 className="card-title">{ele.title} </h2>
 <ReadMoreReact text={ele.body} min={20}   readMoreText=  "Click here to read more"/>
 
                       <p className="h5" >{Object.keys(this.props.user).length!==0 ?(<div>{profile?<img  class="rounded-circle"  src={ `http://localhost:7000/${profile}`} width="40" height="40"/>:<Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={names?.username} size="25" round={true} textSizeRatio={1.75} />}<Link to ={`/users/profile/${userid}`}><span style={{padding:"15px"}} >{names?.username}</span> </Link></div>):(<div>  {profile?<img  class="rounded-circle"  src={ `http://localhost:7000/${profile}`} width="20" height="20"/>:<Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={names?.username} size="25" round={true} textSizeRatio={1.75} />}<span style={{padding:"12px"}}>{names?.username}</span></div>)}</p>
                       <small class="text-muted"> posted on{moment(ele.createdAt).fromNow()}</small>
                            
                      {Object.keys(this.props.user).length!==0 ?(<div>{this.props.user._id==likeUser?(<div>  you liked{ele.likes.length} <button type="button"    onClick={()=>{this.handleDislike(ele._id)}}> <h6 ><FontAwesomeIcon icon="thumbs-down" /> dislike</h6></button>  <button type="button" style={{padding:"15px"}} className="btn btn-light" class="btn btn-outline-secondary"  onClick={()=>{this.AddComment(ele._id)}}  > AddComment</button> <button type="button" className="btn btn-light" class="btn btn-outline-secondary" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button>     </div>):(<div>  {ele.likes.length} <button type="button" className="btn btn-light"  onClick={()=>{this.handleLike(ele._id)}}> <h6 ><FontAwesomeIcon icon="thumbs-up" /> like</h6></button> <button type="button"class="btn btn-light"  onClick={()=>{this.AddComment(ele._id)}}>  AddComment</button>  <button type="button" className="btn btn-light" onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button>     </div>)}</div> ):(<div> {ele.likes.length}   <button type="button" class="btn btn-light"   onClick={()=>{this.handleLike(ele._id)}} ><h6 ><FontAwesomeIcon icon="thumbs-up" /> like</h6></button> <button type="button"class="btn btn-light" class="btn btn-outline-secondary" onClick={()=>{this.AddComment(ele._id)}}>  AddComment</button> <button type="button" className="btn btn-light"  class="btn btn-outline-secondary"onClick={()=>{this.showComent(ele._id)}}><BsFillChatDotsFill/>view all{ele.comments.length}comments</button></div>)}
                       
                            </div>
                            </div>
                           
                        )
   
                    })
                }
         {this.state.count<this.props.article?.length!=0&& <button onClick={this.handleView} className="btn btn-outline-success"> view more</button>}      
                
           </div> 
        )
    }
}
const mapStateToProps=(state)=>{
    console.log("state",state.user)
    return{
        user:state.users,
        article:state.articles,
        allusers:state.allUsers
    }
}

export default connect(mapStateToProps)(Article)
