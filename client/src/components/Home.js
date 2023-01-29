import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "./pagination"
import homeCss from "../css modules/home.module.css"
import { addAllDogs, originalDogs } from "../redux/actions"
import Cards from "./Cards"
import Filters from "./Filters"
import Buttons from "./Buttons"
import Searchs from "./Searchs"


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
    },)
    
    return (
        <div className={homeCss.totalHome}>
            <h1>Dog Breeds!</h1>

            <Searchs  actualHomeState={actualHomeState} setPage={setPage} setValue={setValue} setNotFound={setNotFound} dispatch={dispatch}/>

            <Buttons actualHomeState={actualHomeState} originalDogsState={originalDogsState} originalDogs={originalDogs} dispatch={dispatch} setNotFound={setNotFound} setPage={setPage} setValue={setValue}/>

            <Filters setNotFound={setNotFound} dispatch={dispatch} setPage={setPage} setValue={setValue} originalDogsState={originalDogsState} filters={filters}/>
    
            {notFound && <p className={homeCss.p_notFound}>No breeds were found</p>}

            <Cards actualHomeState={actualHomeState} page={page} amountPerPage={amountPerPage}/>
            
            <div className={homeCss.pagination}>
                <Pagination page={page} setPage={setPage} max={max} value={value} setValue={setValue}/>
            </div>
        </div>  
    )
}

export default Home