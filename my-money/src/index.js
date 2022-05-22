import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  // strictMode is used to detect and console certain error which could occur during rendering
  <React.StrictMode> 
    <AuthContextProvider> {/*context provider is rapping all the components of the app */}
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
