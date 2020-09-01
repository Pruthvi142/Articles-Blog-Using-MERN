export const selectCmtUser=(alluser,id)=>{
    let  user
      user= alluser.find(user=>{
          if(user._id==id)
          {
              
              return user.username
          
          }
    
      })
      return user
    }