import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./pagination"
import homeCss from "../css modules/home.module.css"
import { Link } from "react-router-dom"
import { addAllDogs, originalDogs } from "../redux/actions"
import Cards from "./Cards"
import Filters from "./Filters"


function Home({ filters }) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(1)
    const [amountPerPage] = useState(8)
    const actualHomeState = useSelector(state => state.allDogs)
    const originalDogsState = useSelector(state => state.originalDogs)

    let max;
    if (actualHomeState && actualHomeState.length) {
        max = Math.ceil(actualHomeState.length / amountPerPage);
    }

    useEffect(() => {
        if (actualHomeState.length === 0) {
            fetch('http://localhost:3001/dogs')
                .then(res => res.json())
                .then(dogs => {
                    dispatch(addAllDogs(dogs.lista))
                    dispatch(originalDogs(dogs.lista))
                    
                })
            }
    }, [dispatch, actualHomeState])

    const onKeyDownSearchRace = (e) => {
        if (e.keyCode === 13) {
            fetch(`http://localhost:3001/dogs?name=${e.target.value}`)
                .then(res => res.json())
                .then(dogs => {
                    const newArray = dogs.lista.filter(elem1=> {
                        return actualHomeState.some(elem2 => elem1.name === elem2.name)
                    });
                    setPage(1)
                    setValue(1)
                    dispatch(addAllDogs(newArray))
                })
        }
    }

    const onKeyDownSearchTemperament = (e) => {
        if (e.keyCode === 13) {
            const newArray = actualHomeState.filter(dog => {
                if (dog.temperaments) {
                    return dog.temperaments.toUpperCase().includes(e.target.value.toUpperCase())
                }
                return false
            })
            dispatch(addAllDogs(newArray))
        }
    }

    const resetDogs = () => {
        fetch('http://localhost:3001/dogs')
            .then(res => res.json())
            .then(dogs => {
                
                dispatch(addAllDogs(dogs.lista))
                dispatch(originalDogs(dogs.lista))
                // const a = {target:{value:"none-races"}}
                // const b = {target:{value:"none-weight"}}
                // filterByOriginAndWeight(a)
                // filterByOriginAndWeight(b)
        })
    }
    
    const myRaces =  originalDogsState.filter(race => race.id < 300)
    const apiRaces =  originalDogsState.filter(race => race.id > 300)
    const lightWeight =  originalDogsState.filter(dog => {
        const numberWeight = parseInt(dog.weight.substr(-2).trim())
        return numberWeight < 12
    })
    const mediumWeight =  originalDogsState.filter(dog => {
        const numberWeight = parseInt(dog.weight.substr(-2).trim())
        return numberWeight >= 12 && numberWeight <= 30
    })
    const heavyWeight =  originalDogsState.filter(dog => {
        const numberWeight = parseInt(dog.weight.substr(-2).trim())
        return numberWeight > 30
    })

    const filterByOriginAndWeight = (e) => {
       
        switch (e.target.value) {
            case "my-races":
                filters[0] = [...myRaces];
                break;
            case "api-races":
                filters[0] = [...apiRaces]
                break;
            case "none-races":
                filters[0] = [...myRaces, ...apiRaces]
                break;
            case "light-weight":
                filters[1] = [...lightWeight]
                break;
            case "medium-weight":
                filters[1] = [...mediumWeight]
                break;
            case "heavy-weight":
                filters[1] = [...heavyWeight]
                break;
            case "none-weight":
                filters[1] = [...lightWeight, ...mediumWeight, ...heavyWeight]
                break;
            default:
                return
        }
       
        let show = []
        
        if (filters[0] !== "none") {
            show[0] = [...filters[0]]
        }
        if (filters[1] !== "none") {
            show[1] = [...filters[1]]
        }
        if (show[0] && show[1]) {
            let show2 = show[0].filter(race1 => show[1].find(race2 => race2.id === race1.id));
            dispatch(addAllDogs(show2))
        }
        else if (show[0]) {
            dispatch(addAllDogs(show[0]))
        }
        else if (show[1]) {
            dispatch(addAllDogs(show[1]))
        }   
    }

    const sortByWeightMinToMax = () => {
       actualHomeState.sort(function(a, b) {
            const aWeight = parseInt(a.weight.substr(-2).trim())
            const bWeight = parseInt(b.weight.substr(-2).trim())
          return aWeight - bWeight;
        });
        const newArray = [...actualHomeState]
        dispatch(addAllDogs(newArray))
    }

    const sortByWeightMaxToMin = () => {
        actualHomeState.sort(function(a, b) {
            const aWeight = parseInt(a.weight.substr(-2).trim())
            const bWeight = parseInt(b.weight.substr(-2).trim())
            return bWeight - aWeight;
        });
        const newArray = [...actualHomeState]
        dispatch(addAllDogs(newArray))
    }

    const sortByNameAtoZ = () => {
        actualHomeState.sort(function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });
        const newArray = [...actualHomeState]
        dispatch(addAllDogs(newArray))
    }     

    const sortByNameZtoA = () => {
        actualHomeState.sort(function(a, b) {
            const nameA = a.name.toUpperCase(); // ignore upper and lowercase
            const nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });
        const newArray = [...actualHomeState]
        dispatch(addAllDogs(newArray))
    }
    
    return (
        <div>
            <h1>Home</h1>
            <input onKeyDown={(e) => onKeyDownSearchRace(e)} placeholder="Search race..."/>
            <input onKeyDown={(e) => onKeyDownSearchTemperament(e)} placeholder="Search temperament"/>
            <button onClick={() => resetDogs()}>All dogs</button>
            <button onClick={() => sortByWeightMinToMax()}>Sort ascending by weight</button>
            <button onClick={() => sortByWeightMaxToMin()}>Sort descending by weight</button>
            <button onClick={() => sortByNameAtoZ()}>Sort by name A to Z</button>
            <button onClick={() => sortByNameZtoA()}>Sort by name Z to A</button>

            <Filters filterByOriginAndWeight={filterByOriginAndWeight}/>

            <Cards actualHomeState={actualHomeState} page={page} amountPerPage={amountPerPage}/>
            
            <div className={homeCss.pagination}>
                <Pagination page={page} setPage={setPage} max={max} value={value} setValue={setValue}/>
            </div>
            <Link to={'/form'}>Form</Link>
        </div>
        
    )
}

export default Home