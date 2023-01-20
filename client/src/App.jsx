import './App.css';
import React, { useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Form from './components/Form';
import { useDispatch } from 'react-redux'
import { addTemperaments, addAllDogs } from "./redux/actions"


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:3001/temperaments')
        .then(res => res.json())
        .then(temp => {
            dispatch(addTemperaments(temp.temperaments))
        })
}, [dispatch])

  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/form" component={Form} />
    </BrowserRouter>
  );
}

export default App;
