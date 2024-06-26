import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BsEnvelopeFill, BsLock } from "react-icons/bs";
import { startAdminLogin } from "../Actions/AdminAction";
import { connect } from "react-redux";
class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleBack = () => {
    window.location.href = "/";
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };
    const redirect = () => {
      this.props.history.push("/admin/articles");
    };
    this.props.dispatch(startAdminLogin(formData, redirect));
  };

  render() {
    return (
      <div className="container-fluid bg">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-3">
            <form
              className="container"
              onSubmit={this.handleSubmit}
              className="form-conatianer"
            >
              <div className="form-group">
                <label style={{ color: "white" }}>email:</label>
                <div className="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <BsEnvelopeFill />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Enter the email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label style={{ color: "white" }}>password:</label>
                <div className="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <BsLock />
                    </span>
                  </div>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.value}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <input type="submit" class="btn btn-success" value="submit" />
            </form>
          </div>
        </div>

        <button type="button" class="btn btn-primary" onClick={this.handleBack}>
          Back
        </button>
      </div>
    );
  }
}
export default connect()(AdminLogin);
