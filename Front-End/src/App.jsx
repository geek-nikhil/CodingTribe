import React from 'react';
import './App.css';
import Main from './components/Main';
import store from './utilities/appStore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import ProtectedRoute from './components/protectedRoute';
import { Provider, useSelector } from 'react-redux';
import appStore from './utilities/appStore';
import Body from './components/Body';

function App() {
  return (
   <Provider store={appStore}>
    <Body/>
   </Provider>
  );
}

export default App;
