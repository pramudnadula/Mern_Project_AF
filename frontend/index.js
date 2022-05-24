import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import allreducers from './src/Reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
//STORE



const store = createStore(
  allreducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

createRoot(document.getElementById('app')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);


