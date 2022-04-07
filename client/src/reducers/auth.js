


// create user reducer function
export const authReducer = (state = {name: "sohan", role: "seller"}, action) =>{
    switch (action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload}
      
      case "LOGOUT":
        return action.payload;    
  
      default:
        return state;
    }
  }