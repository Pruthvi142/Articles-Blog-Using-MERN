export const selectLikeUser=(user,likes)=>{
    let  likeUser
    console.log("likesss",likes, "userid",user._id)
      likeUser= likes.find(like=>{
          if(like==user._id)
          {
              console.log("select",like)
              return like
          
          }
    
      })
      return likeUser
    }