

const ArticleReducer=(state=[],action)=>{
    switch(action.type)
    {
    
        case 'SET_ARTICLE':{
           
        return state.concat(action.payload)
           
         
        }
        case 'GET_ART':{
            return [].reverse().concat(action.payload)
        }
      
        case 'DELETE_ARTICLE':{
            return state.filter(ele=>ele._id!=action.payload._id)
        }
        case 'ADD COMMENT':{
            return state.map(ele=>{
                if(ele._id==action.payload._id)
                {
                    return Object.assign({},ele,action.payload)
                }
                else
                {
                    return Object.assign({},ele)
                }
            })

        }
        case 'DELETE COMMENT':{
            console.log("dele cmt",action.payload._id )
            console.log("cmot in state",state)
            let cmt=state.find(ele=>ele._id==action.payload. articleId)
            console.log("art in cmt",cmt)
         return cmt.comments.filter(ele=>ele._id!=action.payload._id)
          
           


          



        }
        case 'LIKE_ART':{
           
            return state.map(ele=>{
                if(ele._id==action.payload._id)
                {
                    return Object.assign({},ele,action.payload)
                }
                else
                {
                    return Object.assign({},ele)
                }
            })

         }

         case 'DISLIKE':{

            return state.map(ele=>{
                if(ele._id==action.payload._id)
                {
                    return Object.assign({},ele,action.payload)
                }
                else
                {
                    return Object.assign({},ele)
                }
            })

         }
        default :{
             return [...state]
        }
    }
}
export default ArticleReducer