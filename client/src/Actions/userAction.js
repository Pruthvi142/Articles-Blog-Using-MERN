import axios from 'axios'
import Swal from 'sweetalert2'
import React from 'react'


export const setUser=(data)=>{
    console.log("action user data",data)
    return{type:'SET_USER',payload:data}
}
export const getAllUser=(data)=>{
    console.log ("setuser",data)
    return {type:'GET_ALL_USER',payload:data}

}
export const deleteUser=(data)=>{
    return {tye:'DELETE_USER',payload:data}
}
export const setAlluser=(data)=>{
     return{type:'SET_ALL_USER',payload:data}
}
export const userfollow=(data)=>{
    console.log("setfollow",data)
    return {type:'USER_FOLLOW',payload:data}
}
export const userUnfollow=(data)=>{
    return{type:"USER_UNFOLLOW",payload:data}
}

export const startUserRegister=(formdata,redirect)=>{
      return(dispatch)=>{
          axios.post('http://localhost:7000/users/register',formdata,  { headers: {'Content-Type': 'multipart/form-data; ',}})
            .then((respones)=>{
                console.log("response",respones.data)
                 const user=respones.data
                 if(respones.data.hasOwnProperty('errors'))
                 {
                     console.log("err",respones.data)
                     Swal.fire(respones.data.errors)
                 }
                 else{

                 
                 Swal.fire({
                    icon: 'success',
                    position:"top",
                    title: 'register sucessfully',
                   
                   
                  }).then(result=>{
                       if(result.value)
                       {
                        dispatch(setAlluser(user))
                        redirect()
                       }
                  })
               
                } 
            })
        
            .catch((err)=>{
                console.log(err)
            })
       
      }
    
}
export const startUserLogin=(formdata,redirect)=>{
    return(dispatch)=>{
        axios.post('http://localhost:7000/users/login',formdata)
          .then((respones)=>{
              if(respones.data.hasOwnProperty('errors'))
              {
                  console.log("err",respones.data)
                  Swal.fire(respones.data.errors)
              }
              else
              {
                
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: "login succssfully",
                   
                  })

                

                        console.log(respones.data.token)
                        localStorage.setItem('authToken',respones.data.token)
        
                        axios.get('http://localhost:7000/users/account',{headers:{'Authorization':localStorage.getItem('authToken')}})
                        .then((respones)=>{
                              console.log("log in",respones.data)
                              const user=respones.data
                              dispatch(setUser(user))
                              redirect()
                             
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                        
                        
                
                  .catch((err)=>{
                      console.log(err)
                  })

                  
             }
          })
     }
}
export const startGetUser=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:7000/users/account',{headers:{'Authorization':localStorage.getItem('authToken')}})
        .then((response)=>{
            const users=response.data
             console.log( "get data",users)
            dispatch(setUser(users))
        }) 
        .catch((err)=>{
            console.log(err)
        })
    }
}
export const startGetAllUsers=()=>{
  return(dispatch)=>{
      axios.get('http://localhost:7000/users/allusers')
       .then((respones)=>{
           console.log(respones.data)
           const data=respones.data
           dispatch(getAllUser(data))
       })
  }
}
export const startUserFollow=(id)=>{
    console.log("follow action",id)
    return(dispatch)=>{
        axios.post(`http://localhost:7000/users/follow/${id}`,{},{headers:{'Authorization':localStorage.getItem('authToken')}})
          .then((follow)=>{
              const data=follow.data
              console.log("follow",data)
              dispatch(userfollow(data))
          })
          .catch((err)=>{
              console.log(err)
          })
    }
}
export const startUserUnfollow=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:7000/users/unfollow/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
         .then((respones)=>{
              console.log("unfollow",respones.data)
              const data=respones.data
              dispatch(userUnfollow(data))

         })
         .catch((err)=>{
             console.log(err)
         })
    }
}
export const startForgetPassword=(formdata,redirect)=>{
    return(dispatch)=>{
        axios.post('http://localhost:7000/users/forgetpassword',formdata)
             .then((response)=>{
                 if(response.data.hasOwnProperty('errors'))
                  {
                    Swal.fire(response.data.errors)
                  }
                  else{
                   
            
                    
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-center',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        onOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: response.data
                      })
                  }
             })
    }
}
export const startSetNewPassword=(formdata,redirect)=>{
    console.log("form",formdata) 
    return(dispatch)=>{
        axios.post('http://localhost:7000/users/newpassword',formdata)
         .then((response)=>{
             if(response.data.hasOwnProperty('errors'))
              {
                  Swal.fire(response.data.errors)
              }
              else
              {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    onOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: response.data.message,
                   
                  })
                  redirect()
                 
              }
         })
    }
}


    

