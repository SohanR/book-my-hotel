import { combineReducers } from "redux";
import { authReducer } from "./auth";
// combine multiple reducer

const rootReducer = combineReducers({
    user: authReducer,
  })
  

export default rootReducer;