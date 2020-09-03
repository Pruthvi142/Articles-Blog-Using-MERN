const AllUsers=(state=[],action)=>
{
    switch(action.type)
    {
       case 'SET ALL USER':{
           return state.concat(action.payload)
       }

        
        case 'GET_ALL_USER':{
        
            console.log("rdr",action.payload)
             return [].concat(action.payload)
        }
        case 'DELETE_USER':{        
            console.log("all user delete",action.payload)
            return state.filter(ele=>ele._id!=action.payload._id)
        }
        default:{
            return[...state]
        }
    }
}

export default AllUsers