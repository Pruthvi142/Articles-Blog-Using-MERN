import axios from 'axios'
import Swal from 'sweetalert2'


export const setUser=(data)=>{
    console.log("action user data",data)
    return{type:'SET_USER',payload:data}
}
export const setAllUser=(data)=>{
    console.log ("setuser",data)
    return {type:'SET_ALL_USER',payload:data}

}
export const deleteUser=(data)=>{
    return {tye:'DELETE_USER',payload:data}
}

export const startUserRegister=(formdata,redirect)=>{
      return(dispatch)=>{
          axios.post('http://localhost:7000/users/register',formdata)
            .then((respones)=>{
                console.log("response",respones.data)
                 const user=respones.data
                 Swal.fire({
                    icon: 'success',
                    position:"top",
                    title: 'register sucessfully',
                   
                  }).then(result=>{
                       if(result.value)
                       {
                        redirect()
                       }
                  })
               
                
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
                Swal.fire({
                    icon: 'success',
                    position:"top",
                    title: 'login sucessfully',
                   
                  }).then(result=>{
                       if(result.value)
                       {

                        console.log(respones.data.token)
                        localStorage.setItem('authToken',respones.data.token)
        
                        axios.get('http://localhost:7000/users/account',{headers:{'Authorization':localStorage.getItem('authToken')}})
                        .then((respones)=>{
                              console.log(respones.data)
                              const user=respones.data
                              dispatch(setUser(user))
                              redirect()
                             
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                           }
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
             console.log( "login",users)
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
           dispatch(setAllUser(data))
       })
  }
}


    

