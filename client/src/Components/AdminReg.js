import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BsBoxArrowInRight,BsFillPersonFill ,BsEnvelopeFill,BsLock} from "react-icons/bs";
import {startAdminRegister} from '../Actions/AdminAction'
import {connect} from 'react-redux'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
              username:"",
              email:"",
              password:""
        }
        
    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})

    }
    handleSubmit=(e)=>{
        
      e.preventDefault()
      const formData={
          username:this.state.username, 
          email:this.state.email,
          password:this.state.password
      }
      const redirect=()=>{
        this.props.history.push('/admin/login')
      }
      this.props.dispatch(startAdminRegister(formData,redirect))
    
    }
    
    render() {
        return (
            <div className="container-fluid bgReg">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-3">
                      
                        <form className="container" onSubmit={this.handleSubmit} style={{marginTop:'10vh'}}>
                            <div className="form-group">
                              <label  style={{color:"white"}}>username:</label>
                               {/* display the icon */}
                              <div className="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsFillPersonFill/></span>
                              </div>
                             <input type="text"  className="form-control" name="username" value={this.state.value} onChange={this.handleChange} placeholder="Enter the user name"  required />
                             </div>
                            </div>

                            <div className="form-group">
                              <label  style={{color:"white"}}>email:</label>
                              <div className="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><BsEnvelopeFill/></span>
                              </div>
                              <input type="text" className="form-control" name="email" value={this.state.value} onChange={this.handleChange} placeholder="Enter the email"  required />
                               </div>
                            </div>
                            <div className="form-group">
                              <label  style={{color:"white"}}>password:</label>
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
