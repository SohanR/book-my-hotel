import { combineReducers } from "redux";
import { authReducer } from "./auth";

// combine multiple reducers
const rootReducer = combineReducers({
    auth: authReducer
  })


export default rootReducer;