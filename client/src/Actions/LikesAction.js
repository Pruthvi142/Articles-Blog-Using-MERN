import axios from 'axios'


export const likeArt=(data)=>{
    return{type:'LIKE_ART',payload:data}
}
export const dislike=(data)=>{
    return{type:'DISLIKE',payload:data}
}
export const startUserLike=(id)=>{
    console.log("like id",id)
    console.log("local",localStorage.getItem('authToken'))
    return(dispatch)=>{
        axios.post(`http://localhost:7000/users/articles/likes/${id}`,{},{headers:{'Authorization':localStorage.getItem('authToken')}})
        // axios.post(`http://localhost:7000/users/articles/likes/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
         .then((response)=>{
            //  window.location.reload(true)
             console.log(" art like",response.data)
             const data=response.data
            dispatch(likeArt(data))
         })
    }
}
export const startUesrDislike=(id)=>{
    console.log("dislike", id)
    return(dispatch)=>{
        axios.delete(`http://localhost:7000/users/articles/dislikes/${id}`, {headers:{'Authorization':localStorage.getItem('authToken')}})
           .then((response)=>{
            //indow.location.reload(true)
               console.log(response.data)
               const data=response.data
               dispatch(dislike(data))
           })
            
    }
}