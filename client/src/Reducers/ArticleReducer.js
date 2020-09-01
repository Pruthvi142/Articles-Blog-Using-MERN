

const ArticleReducer=(state=[],action)=>{
    switch(action.type)
    {
    
        case 'SET_ARTICLE':{
           
            return state.concat(action.payload)
           
         
        }
        case 'GET_ART':{
            return [].concat(action.payload)
        }
        case 'EDIT_ART':{
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
        case 'DELETE_ARTICLE':{
            return state.filter(ele=>ele._id!=action.payload._id)
        }
        case 'DELETE COMMENT':{
            return state.comments.filter(ele=>ele._id!==action.payload._id)
        }
        default :{
             return [...state]
        }
    }
}
export default ArticleReducer