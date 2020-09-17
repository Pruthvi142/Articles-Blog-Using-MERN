const commentsReducer=(state=[],action)=>{
    switch(action.type)
    {
        case 'GET_CMTS':{
         console.log("reducers",action.payload)
            return [].concat(action.payload)
        }
        case 'DELETE CMT':{
          return state.filter(ele=>ele._id!=action.payload._id)
        }

        default:{
            return [...state]
        }
    }

}
export default commentsReducer