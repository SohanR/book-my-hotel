import React from 'react';
import ReactDOMClient from "react-dom/client";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';


// create user reducer function
const authReducer = (state = {}, action) =>{
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {...state, ...action.payload}
    
    case "LOGOUT":
      return action.payload;    

    default:
      return state;
  }
}

// combine multiple reducer

const rootReducer = combineReducers({
  user: authReducer,
})

// create redux store
const store = createStore(rootReducer, composeWithDevTools());


const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
   
  </React.StrictMode>
  
);


reportWebVitals();
