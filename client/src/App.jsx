import './App.css';
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
    </BrowserRouter>
  );
}

export default App;
