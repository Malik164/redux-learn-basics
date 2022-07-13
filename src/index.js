import React from 'react';
import ReactDOM from 'react-dom/client';
import "./containers/css/index.css"
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import counterReducer from './store/reducers/counterReducer';
import resultsReducer from './store/reducers/resultsReducer';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
  ctr:counterReducer,
  rsr:resultsReducer
})

// REDUX MIDDLEWARES --- these are executed an action dipsatched and reaches to the  reducer it is executed between it
// custom middleware

const Logger_func=store=>next=>action=>{
  // here if you don't call next the dispatched action will never reaches to the reducer
  /*
  console.log(store.getState());
  console.log(next);
  console.log(action);
  // here you can manipulate the action
  console.log('prev action',action);
  if (action.type==='ADD') {
    action.payload=10
  }
  console.log('updated action',action);
  */
  next(action)

}

// create store
// after creating middlware now apply it to the global store

// stuff for handling and enabling redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// now apply enhancers to global store
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(Logger_func,thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
