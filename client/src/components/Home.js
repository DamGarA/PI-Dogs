import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./pagination"
import homeCss from "../css modules/home.module.css"
import { Link } from "react-router-dom"
import { addAllDogs, originalDogs } from "../redux/actions"


function Home({ filters }) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(1)
    const [amountPerPage, setAmountPerPage] = useState(8)
    const actualHomeState = useSelector(state => state.allDogs)
    const originalDogsState = useSelector(state => state.originalDogs)

    let max;
    if (actualHomeState && actualHomeState.length) {
        max = Math.ceil(actualHomeState.length / amountPerPage);
    }

    useEffect(() => {
        if (actualHomeState.length == 0) {
        fetch('http://localhost:3001/dogs')
            .then(res => res.json())
            .then(dogs => {
                dispatch(addAllDogs(dogs.lista))
                dispatch(originalDogs(dogs.lista))
                
            })
        }
   }, [])

    const onKeyDownSearchRace = (e) => {
        if (e.keyCode === 13) {
            fetch(`http://localhost:3001/dogs?name=${e.target.value}`)
                .then(res => res.json())
                .then(dogs => {
                    const newArray = dogs.lista.filter(elem1=> {
                        return actualHomeState.some(elem2 => elem1.name == elem2.name)
                    });
                    setPage(1)
                    setValue(1)
                    dispatch(addAllDogs(newArray))
                })
        }
    }

    const onKeyDownSearchTemperament = (e) => {
        if (e.keyCode == 13) {
            const newArray = actualHomeState.filter(dog => {
                if (dog.temperaments) {
                    return dog.temperaments.toUpperCase().includes(e.target.value.toUpperCase())
                }
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
        })
    }

    //averrr
    
    const myRaces =  originalDogsState.filter(race => race.id < 300)
    const apiRaces =  originalDogsState.filter(race => race.id > 300)
    const lightWeight =  originalDogsState.filter(dog => dog.weight[0] < 3)
    const mediumWeight =  originalDogsState.filter(dog => dog.weight[0] >= 3 && dog.weight[0] <= 7)
    const heavyWeight =  originalDogsState.filter(dog => dog.weight[0] > 7)

    const filterByOrigin = (e) => {
        switch (e.target.value) {
            case "my-races":
                filters[0] = [...myRaces];
                break;
            case "api-races":
                filters[0] = [...apiRaces]
                break;
            case "light-weight":
                filters[1] = [...lightWeight]
                break;
            case "medium-weight":
                console.log(mediumWeight)
                filters[1] = [...mediumWeight]
                break;
            case "heavy-weight":
                console.log(heavyWeight)
                filters[1] = [...heavyWeight]
                break;
        }
       
        
        let show = []
        if (filters[0] != "none") {
            show[0] = [...filters[0]]
        }
      
        if (filters[1] != "none") {
            show[1] = [...filters[1]]
        }

        if (show[0] && show[1]) {
            let show2 = show[0].filter(race1 => show[1].includes(race1))
            dispatch(addAllDogs(show2))
        }
        else if (show[0]) {
            dispatch(addAllDogs(show[0]))
        }
        else if (show[1]) {
            dispatch(addAllDogs(show[1]))
        }
        
        
        
    }
    //averrrr
    return (
        <div>
            <h1>Home</h1>
            <input onKeyDown={(e) => onKeyDownSearchRace(e)} placeholder="Search race..."/>
            <input onKeyDown={(e) => onKeyDownSearchTemperament(e)} placeholder="Search temperament"/>
            <button onClick={() => resetDogs()}>All dogs</button>

            <label htmlFor="race-selector">Select a race:</label>
            <input type="radio" id="my-races" name="race" value="my-races" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="my-races">My races</label>
            <input type="radio" id="api-races" name="race" value="api-races" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="api-races">API races</label>
            <input type="radio" id="none" name="race" value="none" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="none">None</label>

            <label htmlFor="weight-selector">Select a weight:</label>
            <input type="radio" id="light-weight" name="weight" value="light-weight" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="light-weight">Light weight</label>
            <input type="radio" id="medium-weight" name="weight" value="medium-weight" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="medium-weight">Medium weight</label>
            <input type="radio" id="heavy-weight" name="weight" value="heavy-weight" onChange={(e) => filterByOrigin(e)}/>
            <label htmlFor="heavy-weight">Heavy weight</label>

            <div className={homeCss.racesBlock}>
            {actualHomeState?.slice((page - 1) * amountPerPage, (page - 1) * amountPerPage + amountPerPage)
                .map(race => (
                <div className={homeCss.racesContainer}>
                <div className={homeCss.raceContent}>
                <p>{race.name}</p>
                <img className={homeCss.raceImg} src={race.image}></img>
                <p className={homeCss.temp}>Temperaments:{race.temperaments}</p>
                <p>Weight:{race.weight}</p>
                </div>
                </div>
            ))}
            </div>
            <div className={homeCss.pagination}>
                <Pagination page={page} setPage={setPage} max={max} value={value} setValue={setValue}/>
            </div>
            <Link to={'/form'}>Form</Link>
        </div>
        
    )
}

export default Home