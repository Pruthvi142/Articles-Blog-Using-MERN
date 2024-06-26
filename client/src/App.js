import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import {
  BsBoxArrowInLeft,
  BsBoxArrowInRight,
  BsFillPersonFill,
} from "react-icons/bs";
import { Link, BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Artile from "./Components/Article";
import AddArticle from "./Components/AddArticle";
import MyArticle from "./Components/MyArticles";
import { connect } from "react-redux";
import EditForm from "./Components/EditForm";
import AdminLogin from "./Components/AdminLogin";
import Allusers from "./Components/Allusers";
import Addcomment from "./Components/AddComment";
import AdminReg from "./Components/AdminReg";
import UserArticleShow from "./Components/AdminUserArticleShow";
import ShowComments from "./Components/ShowComment";
import AdminAllArticles from "./Components/AdminAllArticles";
import AdminShowComment from "./Components/AdminShowComment";
import ProfileShow from "./Components/userProfileShow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "react-avatar";
import ResetPassword from "./Components/ResetPassword";
import NewPassword from "./Components/NewPassword";
import ProtectedRoute from "./Components/protect";
import Profile from "./Components/profile";

import Swal from "sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faThumbsUp,
  faThumbsDown,
  faUserCircle,
  faPlusSquare,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";
import profile from "./Components/profile";

library.add(
  faThumbsUp,
  faThumbsDown,
  faUserCircle,
  faPlusSquare,
  faMinusSquare
);

function App(props) {
  let isAuthenticated = localStorage.getItem("authToken");
  console.log("role", props.user);

  const handleLogOut = () => {
    Swal.fire({
      icon: "success",
      position: "top",
      title: "logout sucessfully",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("authToken");
        window.location.href = "/";
      }
    });
  };
  return (
    <div>
      <BrowserRouter>
        {Object.keys(props.user).length !== 0 ? (
          <div>
            {props.user.role == "admin" ? (
              <div>
                <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a class="navbar-brand" href="#">
                    Articles Blog
                  </a>
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <Link to="/users/allusers" class="nav-link">
                        Allusers (<BsFillPersonFill />
                        {props.user.username})
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/admin/articles" class="nav-link">
                        All Article
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="#" onClick={handleLogOut} class="nav-link">
                        {" "}
                        <BsBoxArrowInLeft /> Logout{" "}
                      </Link>
                    </li>{" "}
                  </ul>{" "}
                </div>
              </div>
            ) : (
              <div>
                <div className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a class="navbar-brand" href="#">
                    Articles Blog
                  </a>
                  <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <Link to="/users/myarticles" class="nav-link">
                        My Articles{" "}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/profile" className="nav-link">
                        {props.user.profile ? (
                          <div>
                            <img
                              class="rounded-circle"
                              alt="100x100 "
                              src={`http://localhost:7000/${props.user.profile}`}
                              width="25"
                              height="25"
                            />
                            {props.user.username}
                          </div>
                        ) : (
                          <div>
                            <Avatar
                              color={Avatar.getRandomColor("sitebase", ["red"])}
                              name={props.user.username}
                              size="25"
                              round={true}
                              textSizeRatio={1.75}
                            />
                            {props.user.username}
                          </div>
                        )}
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="#" onClick={handleLogOut} class="nav-link">
                        {" "}
                        <BsBoxArrowInLeft /> Logout{" "}
                      </Link>
                    </li>{" "}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a class="navbar-brand" href="#">
                Articles Blog
              </a>
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <Link to="/user/register" class="nav-link">
                    <BsFillPersonFill /> SignUp
                  </Link>
                </li>
                <li class="nav-item">
                  <Link to="/login" class="nav-link">
                    {" "}
                    <BsBoxArrowInRight /> Login{" "}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}

        <Switch>
          <Route path="/user/register" component={Register} exact={true} />
          <Route path="/login" component={Login} exact={true} />
          <Route path="/" component={Artile} exact={true} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/register" component={AdminReg} />
          {isAuthenticated ? (
            <Route path="/article/showcomment/:id" component={ShowComments} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
          {isAuthenticated ? (
            <Route path="/admin/showcomment/:id" component={AdminShowComment} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
          {isAuthenticated ? (
            <Route path="/user/AddArticle" component={AddArticle} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/users/myarticles" component={MyArticle} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/users/EditArticle/:id" component={EditForm} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/users/allusers" component={Allusers} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/article/comment/:id" component={Addcomment} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/users/articleshow/:id" component={UserArticleShow} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route
              path="/admin/articles"
              component={AdminAllArticles}
              exact={true}
            />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}

          {isAuthenticated ? (
            <Route path="/users/profile/:id" component={ProfileShow} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
          {isAuthenticated ? (
            <Route path="/users/forgetpassword" component={ResetPassword} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
          {isAuthenticated ? (
            <Route path="/users/reset/:id" component={NewPassword} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
          {isAuthenticated ? (
            <Route path="/profile" component={profile} />
          ) : (
            <Redirect to={{ pathname: "/login" }} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.users,
  };
};
export default connect(mapStateToProps)(App);
