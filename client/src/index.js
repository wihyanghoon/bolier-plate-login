import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddeware from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddeware, ReduxThunk)(createStore)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__
      && window.__REDUX_DEVTOOLS_EXTENSION__())
    }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
