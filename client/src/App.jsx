import './App.css';
import React, { useEffect } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Form from './components/Form';
import Detail from './components/Detail';
import NavBar from './components/NavBar';
import BreedCreated from './components/BreedCreated';
import { useDispatch } from 'react-redux'
import { addTemperaments } from "./redux/actions"



function App() {
  const dispatch = useDispatch()
  let filters = ["none", "none", "none-races", "none-weight"]

  useEffect(() => {
    fetch('http://localhost:3001/temperaments')
        .then(res => res.json())
        .then(temp => {
            dispatch(addTemperaments(temp.temperaments))
        })
}, [dispatch])

  return (
    <BrowserRouter>
      <NavBar/>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" render={(props) => <Home {...props} filters={filters} />} />

      <Route exact path="/form" component={Form} />
      <Route exact path="/breedCreated/:id" component={BreedCreated}/>
      <Route exact path="/detail/:id" component={Detail} />
    </BrowserRouter>
  );
}

export default App;
