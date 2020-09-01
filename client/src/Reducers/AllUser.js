const AllUsers=(state=[],action)=>
{
    switch(action.type)
    {
       
        case 'SET_ALL_USER':{
        
            console.log("rdr",action.payload)
             return [].concat(action.payload)
        }
        case 'DELETE_USER':{
            return state.filter(ele=>ele._id!=action.payload._id)
        }
        default:{
            return[...state]
        }
    }
}

export default AllUsers