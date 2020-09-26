import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BsBoxArrowInRight,BsFillPersonFill ,BsEnvelopeFill,BsLock} from "react-icons/bs";
import {startUserRegister} from '../Actions/userAction'
import {connect} from 'react-redux'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
              profile:null,
              username:"",
              email:"",
              password:""
        }
        
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    handleProfile=(e)=>{
      this.setState({
        profile:e.target.files[0]
      })
    }
    handleSubmit=(e)=>{
      
      e.preventDefault()
    
    console.log("file",this.state.profile)
    const data =new FormData()
      data.append("username",this.state.username)
      data.append("email",this.state.email)
      data.append("password",this.state.password)
      data.append("profile",this.state.profile)
       console.log("form data",data)
      const redirect=()=>{
        this.props.history.push('/login')
      }
      this.props.dispatch(startUserRegister(data,redirect))
    
    }
    
    render() {
        return (
            <div className="container-fluid bgReg">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-3">
                    <h2 style={{marginTop:"4vh",color:"white"}} >Register with us</h2>
                        <form className="container" onSubmit={this.handleSubmit} style={{marginTop:"10vh"}} encType="multipart/form-data">
                        
                        <div className="form-group">
                           <input type="file" className="form-control"  name="profile" value={this.state.value} onChange={this.handleProfile} />         
                        </div>
                            <div className="form-group">
                              <label style={{color:"white"}}>username:</label>
                               {/* display the icon */}
                              <div className="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsFillPersonFill/></span>
                              </div>
                             <input type="text"  className="form-control" name="username" value={this.state.value} onChange={this.handleChange} placeholder="Enter the user name"  required />
                             </div>
                            </div>

                            <div className="form-group">
                              <label style={{color:"white"}}>email:</label>
                              <div className="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsEnvelopeFill/></span>
                              </div>
                              <input type="text" className="form-control" name="email" value={this.state.value} onChange={this.handleChange} placeholder="Enter the email"  required />
                               </div>
                            </div>
                            <div className="form-group">
                              <label style={{color:"white"}}>password:</label>
                              <div className="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsLock/></span>
                              </div>

                              <input type="password" className="form-control" name="password" value={this.state.value} onChange={this.handleChange} required />
</div>
                            </div>
                            <input type="submit" class="btn btn-success" value="submit"/>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default connect() (Register)
