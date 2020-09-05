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
            //  window.location.reload(false)
         }

    }
    componentDidMount(){
        if(this.props.all.length==0)
        {
            this.props.dispatch(startGetAllUsers())
        }
      
    } 
  
    render() {

        console.log("alluers in cmp",this.props.all)
        return (
            <div>
                {
                    
                    this.props.all.map(ele=>{
                     
                        return(
                           
                            <div className="card border-secondary mb-3" style={{width:"18rem"}}>
                         <div className="card-body text-secondary">
                           
                         <img  class="rounded-circle" alt="100x100 " src={ `http://localhost:7000/${ele.profile}`} width="100" height="100"/>
                         {/* <Card.Img variant="top"src={"http://localhost:3000/ele.profile"}alt="Photo"/> */}
                     
                         
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
