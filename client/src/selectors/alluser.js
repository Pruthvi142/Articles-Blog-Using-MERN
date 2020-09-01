export const selectUser=(alluser,id)=>{
  let  user
    user= alluser.find(user=>{
        if(user._id==id)
        {
            
            return user.username
        
        }
      
    })
//     let users=[]
      
// users.push(user)
// console.log(users.map(ele=>{ return ele}))
// // return users.map(ele=>ele.username)
  return user
 
}