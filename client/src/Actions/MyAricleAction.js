import axios from 'axios'
import Swal from 'sweetalert2'

 export const  getArt=(data)=>{
     return {type:'GET_ARTICLE' ,payload:data}

}
export const deleteArt=(data)=>{
    return{type:'DELETE',payload:data}
}
export const updateArt=(data)=>{
    return {type:'EDIT',payload:data}
}
export const startGetMyArticle=()=>{
    return(dispatch)=>{
        axios.get('http://localhost:7000/users/myarticles',{headers:{'Authorization':localStorage.getItem('authToken')}})
         .then((response)=>{
             console.log("my action",response.data)
             const article=response.data
             
             dispatch(getArt(article))
         })
    }
} 
export const startDeleteArticle=(id)=>{
    return(dispatch)=>{


        Swal.fire({
            title: 'Are you sure?',
           
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                axios.delete(`http://localhost:7000/users/myarticles/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
                .then((response)=>{
                    const data=response.data
                    Swal.fire(
                        'Deleted!',
                        'Your post has been deleted.',
                        'success',
                        dispatch(deleteArt(data))
                      )
                  
        
                })
             }
          })

    }
}
export const startUpdateArticle=(id,formdata,redirect)=>
{
    return(dispatch)=>{
        axios.put(`http://localhost:7000/users/myarticles/${id}`, formdata,{headers:{'Authorization':localStorage.getItem('authToken')}})
        .then((response)=>{
            console.log(response.data)
            const data=response.data
            dispatch(updateArt(data))
            // window.location.href="/users/myarticles" 
        

        })
        redirect()
    }

 }
   
        

