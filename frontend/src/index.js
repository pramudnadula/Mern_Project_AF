import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import allreducers from './Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//STORE



const store = createStore(
  allreducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


