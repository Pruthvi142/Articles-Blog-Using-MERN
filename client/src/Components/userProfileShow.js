import React, { Component } from 'react'
import  {connect} from 'react-redux'
import moment from 'moment'
// import {selectFollowerUser} from'../selectors/selectFollowUser'
import  {startGetAllUsers} from '../Actions/userAction'
import {startUserFollow,startUserUnfollow} from '../Actions/userAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class userProfileShow extends Component {
    handleBack=()=>{
        this.props.history.push("/")
    }
    componentDidMount(){
        if(this.props.all.length==0)
        {
            this.props.dispatch(startGetAllUsers())
        }
      
    } 
    handleFollow=(id)=>{
        
        console.log(" handle follow id",id)
        this.props.dispatch(startUserFollow(id))
    }
    handleUnfollow=(id)=>{
       this.props.dispatch(startUserUnfollow(id))
    }
    render() {
        console.log("userprofile",this.props.user)
        console.log("userArticle",this.props.articles)
        console.log("login user",this.props.login)
        let follow=this.props.user?.followers.find(followId=>{
             if(followId==this.props.login._id)
             {
                 console.log("if",followId)
                 return followId
             }
        })
        console.log("folllower",follow)
        // let follow=selectFollowerUser(this.props.user,this.props.login._id)
        return (
            <div>
               
           
        <h1 style={{fontFamily:"Times New Roman"}}> username:{this.props.user?.username} {follow? <button class="btn btn-outline-danger" onClick={()=>{this.handleUnfollow(this.props.user?._id)}}><FontAwesomeIcon icon="minus-square"/> unfollow</button>:<button class="btn btn-outline-primary" onClick={()=>{this.handleFollow(this.props.user?._id)}}><FontAwesomeIcon icon="plus-square"/> follow</button>} </h1><br/>
               <h1 style={{fontFamily:"Times New Roman"}}> Number of posts :{this.props.articles.length}</h1>
               
            {


                      this.props.articles.map(ele=>{
                     // console.log("name",selectUser(this.props.allusers,ele.userId))
                      // console.log( "name",name)
                           return(
                         <div class="card w-75">
                         <div class="card-body">
                         <h5 class="card-title"> Title:{ele.title} </h5>
                         <p class="card-text">{ele.body}</p>

                        </div>
                       </div>
                      )

                     })

        }

            
                <button className="btn btn-primary" onClick={()=>{this.handleBack()}}>back</button>
            </div>
        )
    }
}
const mapStateToProps=(state,props)=>{
    console.log("all profile",state.allUsers)
    console.log("profile id ",props.match.params.id)
    console.log("find user",state.allUsers.find(ele=>ele._id==props.match.params.id))
    return{
        
       
        articles:state.articles.filter(ele=>ele.userId==props.match.params.id),
        user:state.allUsers.find(ele=>ele._id==props.match.params.id ),
        login:state.users,
        all:state.allUsers
    }
}

export default connect(mapStateToProps)(userProfileShow)