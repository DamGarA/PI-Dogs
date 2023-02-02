import { addAllDogs, originalDogs } from "../../redux/actions";

//ordena de minimo a maximo
const sortByWeightMinToMax = (actualHomeState, setNotFound, dispatch) => {
  //va recibiendo a y b , y ordena dependiendo del resultado
    actualHomeState.sort(function(a, b) {
         const aWeight = (parseInt(a.weight.substr(-2).trim()) + parseInt(a.weight.substr(0,2).trim())) / 2 
         const bWeight = (parseInt(b.weight.substr(-2).trim()) + parseInt(b.weight.substr(0,2).trim())) / 2
       return aWeight - bWeight;
     });
     const newArray = [...actualHomeState]
     setNotFound(false)
     dispatch(addAllDogs(newArray))
 }

//ordena de maximo a minimo
const sortByWeightMaxToMin = (actualHomeState, setNotFound, dispatch) => {
  //va recibiendo a y b , y ordena dependiendo del resultado
    actualHomeState.sort(function(a, b) {
          const aWeight = (parseInt(a.weight.substr(-2).trim()) + parseInt(a.weight.substr(0,2).trim())) / 2 
          const bWeight = (parseInt(b.weight.substr(-2).trim()) + parseInt(b.weight.substr(0,2).trim())) / 2
        return bWeight - aWeight;
    });
    const newArray = [...actualHomeState]
    setNotFound(false)
    dispatch(addAllDogs(newArray))
}

//ordena de maximo a minimo
const sortByNameAtoZ = (actualHomeState, setNotFound, dispatch) => {
  //va recibiendo a y b , y ordena dependiendo del resultado (tabla ASCII)
    actualHomeState.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
    });
    const newArray = [...actualHomeState]
    setNotFound(false)
    dispatch(addAllDogs(newArray))
}

//ordena de maximo a minimo
const sortByNameZtoA = (actualHomeState, setNotFound, dispatch) => {
  //va recibiendo a y b , y ordena dependiendo del resultado (tabla ASCII)
    actualHomeState.sort(function(a, b) {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase(); 
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
    });
    const newArray = [...actualHomeState]
    setNotFound(false)
    dispatch(addAllDogs(newArray))
}

//actualiza todos los perros
const resetDogs = (dispatch, setNotFound, setPage, setValue, filters) => {
  //se piden todos los perros
  fetch('http://localhost:3001/dogs')
    .then(res => res.json())
    .then(dogs => {
      //se resetean todos los filtros
      filters[0] = "none";
      filters[1] = "none";
      filters[2] = "none-races";
      filters[3] = "none-weight";
      //se resetean los estados de redux
      dispatch(addAllDogs(dogs.lista));
      dispatch(originalDogs(dogs.lista));
      setNotFound(false);
      setPage(1);
      setValue(1);
    })
}

export {sortByWeightMinToMax, sortByWeightMaxToMin, sortByNameAtoZ, sortByNameZtoA, resetDogs}