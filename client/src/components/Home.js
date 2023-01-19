import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./pagination"
import homeCss from "../css modules/home.module.css"
import { Link } from "react-router-dom"
import { addAllDogs } from "../redux/actions"


 function Home() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [amountPerPage, setAmountPerPage] = useState(8)
    let actualHomeState = useSelector(state => state.allDogs)
    let max;
    if (actualHomeState && actualHomeState.length) {
        max = Math.ceil(actualHomeState.length / amountPerPage);
    }

   useEffect(() => {
    fetch('http://localhost:3001/dogs')
        .then(res => res.json())
        .then(dogs => {
            dispatch(addAllDogs(dogs.lista))
        })
    setAmountPerPage(8)
   }, [max])

    return (
        <div>
            <h1>Home</h1>
            <input />
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
                <Pagination page={page} setPage={setPage} max={max}/>
            </div>
            <Link to={'/form'}>Form</Link>
        </div>
        
    )
}

export default Home