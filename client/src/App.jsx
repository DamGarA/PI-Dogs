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
import Update from './components/Update';



function App() {
  const dispatch = useDispatch()
  let filters = ["none", "none", "none-races", "none-weight"] // valor inicial de los filtros 

  // cuando renderiza el componente guarda los temperamentos en la base de datos
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

      {/* props es un objeto con información sobre la ruta. Si no es "/", renderiza la navBar */}
      <Route path="/" render={(props) => {
        if (props.location.pathname !== "/") {
          return <NavBar />
        } else {
          return null
        }
      }}/>

      {/* se utiliza el render para mandar propiedades a al componente. "component" no puede mandar propiedades. props es el objeto con informacion de la ruta */}
      <Route exact path="/home" render={(props) => <Home {...props} filters={filters} />} />

      <Route exact path="/form" component={Form} />
      <Route exact path="/breedCreated/:id" component={BreedCreated}/>
      <Route exact path="/detail/:id" component={Detail} />
      <Route exact path="/update/:id" component={Update} />
    </BrowserRouter>
  );
}

export default App;
