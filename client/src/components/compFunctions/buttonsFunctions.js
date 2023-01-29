import { addAllDogs, originalDogs } from "../../redux/actions";

const sortByWeightMinToMax = (actualHomeState, setNotFound, dispatch) => {
    actualHomeState.sort(function(a, b) {
         const aWeight = (parseInt(a.weight.substr(-2).trim()) + parseInt(a.weight.substr(0,2).trim())) / 2 
         const bWeight = (parseInt(b.weight.substr(-2).trim()) + parseInt(b.weight.substr(0,2).trim())) / 2
       return aWeight - bWeight;
     });
     const newArray = [...actualHomeState]
     setNotFound(false)
     dispatch(addAllDogs(newArray))
 }

const sortByWeightMaxToMin = (actualHomeState, setNotFound, dispatch) => {
    actualHomeState.sort(function(a, b) {
          const aWeight = (parseInt(a.weight.substr(-2).trim()) + parseInt(a.weight.substr(0,2).trim())) / 2 
          const bWeight = (parseInt(b.weight.substr(-2).trim()) + parseInt(b.weight.substr(0,2).trim())) / 2
        return bWeight - aWeight;
    });
    const newArray = [...actualHomeState]
    setNotFound(false)
    dispatch(addAllDogs(newArray))
}

const sortByNameAtoZ = (actualHomeState, setNotFound, dispatch) => {
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

const sortByNameZtoA = (actualHomeState, setNotFound, dispatch) => {
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

const resetDogs = (dispatch, setNotFound, setPage, setValue) => {
  fetch('http://localhost:3001/dogs')
    .then(res => res.json())
    .then(dogs => {
      dispatch(addAllDogs(dogs.lista))
      dispatch(originalDogs(dogs.lista))
      setNotFound(false)
      setPage(1)
      setValue(1)
    })
}

export {sortByWeightMinToMax, sortByWeightMaxToMin, sortByNameAtoZ, sortByNameZtoA, resetDogs}