import axios from 'axios'
import Swal from 'sweetalert2'

export const setArticle=(data)=>{
    return{
         type:'SET_ARTICLE' ,payload:data
    }

}
export const startAddComment=(id ,formdata,redirect)=>{
    console.log("cmt id", id)
    return(dispatch)=>{
        axios.post(`http://localhost:7000/article/comment/${id}`,formdata,{headers:{'Authorization':localStorage.getItem('authToken')}})
         .then((response)=>{
          console.log("comment",response.data)
          const data=response.data
        
          redirect()
         })
         .catch((err)=>{
             console.log(err)
         })

    }
}
export const startDeleteComment=(id)=>{
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


                axios.delete(`http://localhost:7000/article/comment/delete/${id}`,{headers:{'Authorization':localStorage.getItem('authToken')}})
                .then((response)=>{
                    const data=response.data
                    window.location.reload(false)
                    Swal.fire(
                        'Deleted!',
                         'comment deleted succesfully',
                        'success'
                      )
                
            
                   
                })
                .catch((err)=>{
                    console.log(err)
                })

















             
            }
          })






















        
    }
}