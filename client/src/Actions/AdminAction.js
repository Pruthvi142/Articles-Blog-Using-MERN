import axios from 'axios'
import Swal from 'sweetalert2'


export const setUser=(data)=>{
    console.log("action user data",data)
    return{type:'SET_USER',payload:data}
}

export const deleteUser=(data)=>{
    return {type:'DELETE_USER',payload:data}
}
export const deleteArt=(data)=>{
    return{type:'DELETE_ARTICLE',payload:data}
}
export const startAdminRegister=(formdata,redirect)=>{
    return(dispatch)=>{
        axios.post('http://localhost:7000/admin/register',formdata)
          .then((respones)=>{
            if(respones.data.hasOwnProperty('errors'))
            {
                console.log("err",respones.data)
                Swal.fire(respones.data.errors)
            }
            else
            {
                redirect()
            }
            //   console.log("response",respones.data)
               const user=respones.data
           
              
          })
          .catch((err)=>{
              console.log(err)
          })
     
    }
}

export const startAdminLogin=(formdata,redirect)=>{

    return(dispatch)=>{
        axios.post('http://localhost:7000/admin/login',formdata)
          .then((respones)=>{
              if(respones.data.hasOwnProperty('errors'))
              {
                Swal.fire(respones.data.errors)
                 
              }
              else
              {
                console.log(respones.data.token)
                Swal.fire({
                    icon: 'success',
                    position:"top",
                    title: 'login sucessfully',
                   
                  }).then(result=>{
                      if(result.value)
                      {
                        console.log(respones.data.token)
                        localStorage.setItem('authToken',respones.data.token)
        
                        axios.get('http://localhost:7000/admin/account',{headers:{'Authorization':localStorage.getItem('authToken')}})
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

export const startAdminDeleteUser=(id)=>{
    return(dispatch)=>{

    
 
            



                axios.delete(`http://localhost:7000/admin/users/delete/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
                .then((response)=>{
                    console.log("delete",response.data)
                    const data=response.data
                    
                         dispatch(deleteUser(data))
                    
                })
                .catch((err)=>{
                    console.log(err)
                })

            




        
    }

}
export const startAdminCommentDelete=(id)=>{
    return(dispatch)=>{


            
              {
                axios.delete(`http://localhost:7000/article/comment/delete/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
                    .then((response)=>{
                         const data=response.data
                        
                           
                             dispatch(deleteUser(data))
                            
                    

                      })
                   .catch((err)=>{
                        console.log(err)
                    })
              }
              
        



    }

}

export const startAdminDeleteArticle=(id)=>{
    return(dispatch)=>{
        axios.delete(`http://localhost:7000/admin/article/delete/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
         .then((response)=>{
             console.log("delete art",response.data)
             const data=response.data
             dispatch(deleteArt(data))
         })
    }
}