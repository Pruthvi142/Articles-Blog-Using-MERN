import React, { Component } from 'react'
import {connect} from 'react-redux'
import Avatar from 'react-avatar'

 class profile extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                {
                
          this.props.user?.profile? ( <div><img  class="rounded-circle" alt="100x100 " src={ `http://localhost:7000/${this.props.user?.profile}`} width="25" height="25"/>{this.props.user?.username}</div>):(<div><Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={this.props.user.username} size="100" round={true} textSizeRatio={1.75} width="100" /> </div>)
        
          }
           <h1>{this.props.user?.username}</h1>
           </div>
           <div className="col-md-10" style={{marginTop:20}}>
           <div>   {this.props.user.followers?.length} <p>followers</p> </div> 
           {this.props.user.following?.length}    <p>following</p>
            

              
              
             
           </div>
          
                
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return{
        user:state.users
    }
}
export default connect(mapStateToProps)(profile)

