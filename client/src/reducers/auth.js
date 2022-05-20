// issue: when reload the page data lost from redux state. so if reload bt data is still available at local storage.
// getting item value from local storage and saving the state value to redux to preven relod issue

let userState;

if(window.localStorage.getItem('auth')){
  userState = JSON.parse(window.localStorage.getItem("auth"));
}
else {
  userState = null;
}

// user reducer function 
export const authReducer = (state = userState, action) =>{
    switch (action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload}

      case "LOGOUT":
        return action.payload;    

      default:
        return state;
    }
  }