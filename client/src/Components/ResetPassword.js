import React, { Component } from 'react'
import { startForgetPassword } from '../Actions/userAction';
import {connect} from 'react-redux'

 class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:""
        }
        
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formdata={
              email:this.state.email
        }
        const redirect=()=>{
            return(
                <div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
            )
        }
        console.log("email",formdata)
        this.props.dispatch(startForgetPassword(formdata ,redirect))


    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4" style={{marginTop:"100px"}}>
                <form onSubmit={this.handleSubmit}>
                    <input email="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="Enter the Email"/>
                    <input type="submit" className="btn btn-success"/>

                </form>
                </div>
            </div>
        )
    }
}
export default connect()(ResetPassword)