
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { startSetNewPassword } from '../Actions/userAction';


 class NewPassword extends Component {
     constructor(props) {
         super(props);
         this.state={
             password:""
         }
     }
     handleChange=(e)=>{
         this.setState({[e.target.name]:e.target.value})

     }
     handleSubmit=(e)=>{
         e.preventDefault()
         const formdata={
             password:this.state.password,
             token:this.props.id
         }
         const id=this.props.id
         const redirect=()=>{
            this.props.history.push('/user/login')
          }
         console.log("id",id)
         this.props.dispatch(startSetNewPassword(formdata,redirect) )

     }
     
    render() {
       
        return (
            <div className="row">

            
            <div className="col-md-4"></div>
            <div className="col-md-4" style={{marginTop:"100px"}}>
            <form onSubmit={this.handleSubmit}>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter the New Password" className="form-control"/>
                <input type="submit" className="btn btn-success"/>
            </form>
            </div>
            </div>
            
        )
    }
}
const mapStateToProps=(state,props)=>{
   
    return{
        id:props.match.params.id

    }
}
export default connect(mapStateToProps)(NewPassword)
