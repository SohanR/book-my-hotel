import React from 'react';
import ReactDOMClient from "react-dom/client";
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import App from './App';
import './index.css';
import rootReducer from './reducers';
import reportWebVitals from './reportWebVitals';





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
