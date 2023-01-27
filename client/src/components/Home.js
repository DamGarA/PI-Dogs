import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./pagination"
import homeCss from "../css modules/home.module.css"
import { originalDogs } from "../redux/actions"
import { onKeyDownSearchRace } from "./compFunctions/homeFunctions"
import Cards from "./Cards"
import Filters from "./Filters"


function Home({ filters }) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(1)
    const [amountPerPage] = useState(8)
    const [notFound, setNotFound] = useState(false)
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
    }, [])

    const onKeyDownSearchTemperament = (e) => {
        if (e.keyCode === 13) {
            const newArray = actualHomeState.filter(dog => {
                
                if (dog.temperaments) {
                    return dog.temperaments.toUpperCase().includes(e.target.value.toUpperCase())
                }
                return false
            })
            if (newArray.length === 0) {
                setNotFound(true)
            } else {
                setPage(1)
                setValue(1)
                setNotFound(false)
                dispatch(addAllDogs(newArray))
            }  
        }
    }

    const resetDogs = () => {
        fetch('http://localhost:3001/dogs')
            .then(res => res.json())
            .then(dogs => {
                
                dispatch(addAllDogs(dogs.lista))
                dispatch(originalDogs(dogs.lista))
                setNotFound(false)
        })
    }

    const filterByOriginAndWeight = (e) => {
        switch (e.target.value) {
            case "my-races":
                filters[0] = originalDogsState.filter(race => race.id < 300)
                break;
            case "api-races":
                filters[0] = originalDogsState.filter(race => race.id > 300)
                break;
            case "none-races":
                filters[0] = [...originalDogsState]
                break;
            case "light-weight":
                filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) < 12)
                break;
            case "medium-weight":
                filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) >= 12 && parseInt(dog.weight.substr(-2).trim()) <= 30)
                break;
            case "heavy-weight":
                filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) > 30)
                break;
            case "none-weight":
                filters[1] = [...originalDogsState]
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
           if (show2.length === 0) setNotFound(true)
           else {
            dispatch(addAllDogs(show2))
            setNotFound(false)
            }
            setPage(1)
            setValue(1)      
        }
        else if (show[0]) {
            dispatch(addAllDogs(show[0]))
            setPage(1)
            setValue(1)  
        }
        else if (show[1]) {
            dispatch(addAllDogs(show[1]))
            setPage(1)
            setValue(1)  
        }   
    }
      
    const sortByWeightMinToMax = () => {
       actualHomeState.sort(function(a, b) {
            const aWeight = parseInt(a.weight.substr(-2).trim())
            const bWeight = parseInt(b.weight.substr(-2).trim())
          return aWeight - bWeight;
        });
        const newArray = [...actualHomeState]
        setNotFound(false)
        dispatch(addAllDogs(newArray))
    }

    const sortByWeightMaxToMin = () => {
        actualHomeState.sort(function(a, b) {
            const aWeight = parseInt(a.weight.substr(-2).trim())
            const bWeight = parseInt(b.weight.substr(-2).trim())
            return bWeight - aWeight;
        });
        const newArray = [...actualHomeState]
        setNotFound(false)
        dispatch(addAllDogs(newArray))
    }

    const sortByNameAtoZ = () => {
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

    const sortByNameZtoA = () => {
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
    
    return (
        <div className={homeCss.totalHome}>
            <h1>Dog Breeds!</h1>
            <span className={homeCss.span_father}>
            <input className={homeCss.basic_slide} onKeyDown={(e) => onKeyDownSearchRace(e, actualHomeState, setPage, setValue, setNotFound, dispatch, addAllDogs)} placeholder="Search breed..."/>
            <label htmlFor="name ">Breed</label>
            </span>
            
            <span className={homeCss.span_father}>
            <input className={homeCss.basic_slide} onKeyDown={(e) => onKeyDownSearchTemperament(e)} placeholder="Search temperament..."/>
            <label htmlFor="name ">Temps.</label>
            </span>

            <button className={homeCss.btn_sort} onClick={() => resetDogs()}>All dogs</button>
            <button className={homeCss.btn_sort} onClick={() => sortByWeightMinToMax()}>Weight asc.</button>
            <button className={homeCss.btn_sort} onClick={() => sortByWeightMaxToMin()}>Weight desc.</button>
            <button className={homeCss.btn_sort} onClick={() => sortByNameAtoZ()}>A to Z</button>
            <button className={homeCss.btn_sort} onClick={() => sortByNameZtoA()}> Z to A</button>

            <Filters filterByOriginAndWeight={filterByOriginAndWeight}/>
    
            {notFound && <p className={homeCss.p_notFound}>No breeds were found</p>}

            <Cards actualHomeState={actualHomeState} page={page} amountPerPage={amountPerPage}/>
            
            <div className={homeCss.pagination}>
                <Pagination page={page} setPage={setPage} max={max} value={value} setValue={setValue}/>
            </div>
        </div>  
    )
}

export default Home