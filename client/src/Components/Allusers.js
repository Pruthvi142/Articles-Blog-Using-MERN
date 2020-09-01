import React, { Component } from 'react'
import  {startGetAllUsers} from '../Actions/userAction'
import {startAdminDeleteUser} from '../Actions/AdminAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import moment from 'moment'

  class Allusers extends Component {


    
    AllPost=()=>{
        this.props.history.push('/admin/articles')
    }
    UserDelete=(id)=>{

        const confirm=window.confirm("Are you Sure")
         if(confirm)
         {
             this.props.dispatch(startAdminDeleteUser(id))
             window.location.reload(false)
         }

    }
    componentDidMount(){
        
        this.props.dispatch(startGetAllUsers())
    } 
  
    render() {

        console.log("alluers in cmp",this.props.all)
        return (
            <div>
                {
                    
                    this.props.all.map(ele=>{
                        let pro=ele.profile
                        console.log("type",typeof(ele.profile))
                        return(
                           
                            <div className="card border-secondary mb-3" style={{width:"18rem"}}>
                         <div className="card-body text-secondary">
                           
                         <img  src= {  './uploads/' + pro} alt="hi"/>
                         {
                             console.log("pro",ele.profile)
                         }
                         
                        <h5 class="card-title"> Name:<Link to ={`/users/articleshow/${ele._id}`}>{ele.username}</Link></h5>
                        <p class="card-text">Email:{ele.email}</p>
                        {/* <p class="card-text"> CreatedOn--{moment(ele.createdAt).format('l')}</p> */}
                        <button type="button" class="btn btn-danger" onClick={()=>{this.UserDelete(ele._id)}}>Delete</button>

                       </div></div>

                        ) 
                      
                    })
                }
                  <button type="button" className="btn btn-primary" onClick={this.AllPost}> back</button>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
       
        all:state.allUsers
    }
}
export default connect(mapStateToProps)(Allusers)
