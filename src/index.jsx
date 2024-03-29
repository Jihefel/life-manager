import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/main.sass'
import App from './App';
import { store } from "./redux/store/store"
import { Provider } from 'react-redux';
// React Router
import { HashRouter as Router } from 'react-router-dom'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
);