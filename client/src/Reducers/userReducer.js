const userReducer=(state={},action)=>{
    switch(action.type)
    {
        case 'SET_USER':{
         console.log("reducers",action.payload)
            return {...action.payload}
        }

        default:{
            return {...state}
        }
    }

}
export default userReducer