
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import {AuthContextProvider} from './context/AuthContext'
import store from './Redux/Store'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
   <Provider store={store} >
    <PersistGate persistor={persistStore(store)} >

    <App />
    </PersistGate>
   </Provider>
  
  
  </React.StrictMode>
);


