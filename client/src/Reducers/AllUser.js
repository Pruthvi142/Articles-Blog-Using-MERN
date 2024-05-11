const AllUsers = (state = [], action) => {
  switch (action.type) {
    case "SET ALL USER": {
      return state.concat(action.payload);
    }
    case "GET_ALL_USER": {
      console.log("rdr", action.payload);
      return [].concat(action.payload);
    }
    case "DELETE_USER": {
      console.log("all user delete", action.payload);
      return state.filter((ele) => ele._id != action.payload._id);
    }
    case "USER_FOLLOW": {
      console.log("reducer follow", action.payload);
      return state.map((ele) => {
        if (ele._id == action.payload._id) {
          return Object.assign({}, ele, action.payload);
        } else {
          return Object.assign({}, ele);
        }
      });
    }

    case "USER_UNFOLLOW": {
      return state.map((ele) => {
        if (ele._id == action.payload._id) {
          return Object.assign({}, ele, action.payload);
        } else {
          return Object.assign({}, ele);
        }
      });
    }
    default: {
      return [...state];
    }
  }
};

export default AllUsers;
