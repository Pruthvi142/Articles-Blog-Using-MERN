import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import {  BsBoxArrowInLeft,BsBoxArrowInRight,BsFillPersonFill} from "react-icons/bs";
import {Link,BrowserRouter,Route,Redirect} from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Artile from './Components/Article'
import AddArticle from './Components/AddArticle'
import MyArticle from './Components/MyArticles'
import { connect } from 'react-redux';
import EditForm from './Components/EditForm';
import AdminLogin from './Components/AdminLogin'
import Allusers  from './Components/Allusers';
import Addcomment from './Components/AddComment'
import AdminReg from './Components/AdminReg'
import UserArticleShow from './Components/AdminUserArticleShow';
import ShowComments from './Components/ShowComment'
import AdminAllArticles from './Components/AdminAllArticles';
import AdminShowComment from './Components/AdminShowComment';
import Profile from './Components/userProfileShow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Avatar from 'react-avatar'
import ResetPassword from './Components/ResetPassword';
import NewPassword from './Components/NewPassword';

import Swal from 'sweetalert2'
import { library } from '@fortawesome/fontawesome-svg-core'
 import { faThumbsUp, faThumbsDown ,faUserCircle,faPlusSquare ,faMinusSquare} from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsUp,faThumbsDown,faUserCircle,faPlusSquare,faMinusSquare)


function App(props) {
  console.log("role",props.user)

  const handleLogOut=()=>{
    


    Swal.fire({
      icon: 'success',
      position:"top",
      title: 'logout sucessfully',
     
    }).then(result=>{
         if(result.value)
         {
          localStorage.removeItem('authToken')  
      window.location.href="/"
         }
    })




 
    

   }
  return (
    
      
   <div>

     <BrowserRouter>
     {
       Object.keys(props.user).length!==0?(<div>
         
                
                   {props.user.role=="admin"? (<div>
                    <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Articles Blog</a>
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                         <Link to="/users/allusers" class="nav-link">Allusers (<BsFillPersonFill/>{props.user.username})</Link>
                        
                    </li>
                    <li class="nav-item">
                    <Link to="/admin/articles" class="nav-link">All Article</Link>
                    </li>
                    
              <li class="nav-item">
                  <Link to="#" onClick={handleLogOut} class="nav-link">    <BsBoxArrowInLeft/>  Logout </Link>
              </li>  </ul> </div></div>) :(<div>
                <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Articles Blog</a>
                <ul class="navbar-nav ml-auto">
  <li class="nav-item">
              <Link to="/users/myarticles" class="nav-link"> {props.user.profile? ( <div>MyArticle-<img  class="rounded-circle" alt="100x100 " src={ `http://localhost:7000/${props.user.profile}`} width="25" height="25"/>{props.user.username}</div>):(<div>MyArticle-<Avatar color={Avatar.getRandomColor('sitebase', ['red'])} name={props.user.username} size="25" round={true} textSizeRatio={1.75} />{props.user.username}</div>)} </Link>
</li>

<li class="nav-item">
<Link to="#" onClick={handleLogOut} class="nav-link">    <BsBoxArrowInLeft/>  Logout </Link>
</li>   </ul></div></div>) 
  



       }
         
   </div>
  ):

       (<div>
           <div className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Articles Blog</a>
             <ul class="navbar-nav ml-auto">
                   <li class="nav-item">
                       <Link  to="/user/register"class="nav-link"><BsFillPersonFill/> SignUp</Link>
                  </li>
                  <li class="nav-item">
                       <Link to="/user/login" class="nav-link">    <BsBoxArrowInRight/>  Login </Link>
                   </li>     
            </ul>
          </div>
        </div>)
     }


         <Route path="/user/register"  component={Register}  exact={true}/>
         <Route path="/user/login" component={Login}/>
         <Route path="/" component={Artile} exact={true}/>
         <Route path="/user/AddArticle" component={AddArticle}/>
         <Route path="/users/myarticles" component={MyArticle}/>
         <Route path="/users/EditArticle/:id" component={EditForm}/>
         <Route path="/admin/login" component={AdminLogin}/>
         <Route path="/users/allusers" component={Allusers}/>
         <Route path="/article/comment/:id" component={Addcomment}/>
         <Route path="/admin/register" component={AdminReg}/>
         <Route path='/users/articleshow/:id' component={UserArticleShow}/>
         <Route path="/article/showcomment/:id" component={ShowComments}/>
         <Route path="/admin/articles" component={AdminAllArticles} exact={true }/>
         <Route path="/admin/showcomment/:id"component={AdminShowComment}/>
         <Route path="/users/profile/:id"component={Profile}/>
         <Route path="/users/forgetpassword" component={ResetPassword}/>
         <Route path="/users/reset/:id" component={NewPassword}/>
         </BrowserRouter>

    </div>
     
  );
  }
  const mapStateToProps = (state) => {
    return {
        user: state.users,
    
    }
  }
export default connect(mapStateToProps)(App)
