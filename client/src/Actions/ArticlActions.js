import axios from 'axios'
import Swal from 'sweetalert2'


export const setArticle=(data)=>{
     return{
          type:'SET_ARTICLE' ,payload:data
     }

}
export const getArt=(data)=>{
    return{
         type:'GET_ART',payload:data
    }
}

export const deleteArt=(data)=>{
    return{type:'DELETE_ARTICLE',payload:data}
}
export const startArticlePost=( formdata,redirect)=>{
    console.log("action",formdata)
    return(dispatch)=>{
        axios.post('http://localhost:7000/users/articles',formdata,{headers:{'Authorization':localStorage.getItem('authToken')}})
          .then((respones)=>{
           
              console.log(respones.data)
              const article=respones.data
              dispatch(setArticle(article))
              redirect()
          })
    }
    
}
export const startGetArticle=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:7000/users/articles')
        .then((respones)=>{
            console.log( "action article",respones.data)
            const data=respones.data
           
            dispatch(getArt(data))
           
        })
    }
}

// export const startAdminDeleteArticle=(id)=>{
//     return(dispatch)=>{
//         axios.delete(`http://localhost:7000/admin/article/delete/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
//          .then((response)=>{
//              console.log("delete art",response.data)
//              const data=response.data
//              dispatch(deleteArt(data))
//          })
//     }
// }