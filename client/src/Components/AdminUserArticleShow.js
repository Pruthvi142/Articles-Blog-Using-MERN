import React, { Component } from 'react'
import {connect} from 'react-redux'
import  {startGetAllUsers} from '../Actions/userAction'


 class ArticleShow extends Component {


    AllPost=()=>{
        this.props.history.push('/users/allusers')
    }
    componentDidMount(){
        
        this.props.dispatch(startGetAllUsers())
    } 

    
    render() {
       console .log( "articleshow",this.props.user)
        return (
            <div>
                <h1 style={{fontFamily:"Times New Roman"}}> username:{this.props.user?.username}</h1><br/>
               <h1 style={{fontFamily:"Times New Roman"}}> Number of posts :{this.props.article.length}</h1>
               
                      
                {


        this.props.article.map(ele=>{
    // console.log("name",selectUser(this.props.allusers,ele.userId))
   // console.log( "name",name)
   return(
       <div class="card w-75">
        <div class="card-body">
       <h5 class="card-title"> Title:{ele.title} </h5>
        <p class="card-text">{ele.body}</p>
        <button type="button" className="btn btn-primary"  onClick={()=>{this.EditArticle(ele._id)}}>Edit</button> <button type="button" class="btn btn-danger" onClick={()=>{this.DeleteArticle(ele._id)}}>Delete</button> 
       </div>
      </div>
   )

})

                }


<button type="button" className="btn btn-primary" onClick={this.AllPost}> back</button> 
            </div>
        )
    }
}
const mapStateToProps=(state,props)=>{
    let art=state.articles
    console.log("showart",art)
    return{

        article:state.articles.filter(ele=>ele.userId==props.match.params.id),
        user:state.allUsers.find(ele=>ele._id==props.match.params.id)
    }
}
export default connect(mapStateToProps)(ArticleShow)
