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
    const [page, setPage] = useState(1) //pagina actual de las cards que se ven
    const [value, setValue] = useState(1) //valor de la pagina en el input de abajo
    const [amountPerPage] = useState(8) // cantidad de cards por pagina
    const [notFound, setNotFound] = useState(false) // alerta de que no se encontraron resultados
    const actualHomeState = useSelector(state => state.allDogs) //lista de razas actuales(filtradas)
    const originalDogsState = useSelector(state => state.originalDogs) // lista de razas sin modificar

    let max; //maximo de paginas q se renderizan

    //si el estado de razas no esta vacio, se asigna el maximo de paginas
    if (actualHomeState && actualHomeState.length) {
        max = Math.ceil(actualHomeState.length / amountPerPage);
    }

    //cuando se renderiza el home se hace dispatch de la lista completa de razas a ambos estados de redux
    useEffect(() => {
        if (actualHomeState.length === 0) {
            fetch('http://localhost:3001/dogs')
                .then(res => res.json())
                .then(dogs => {
                    dispatch(addAllDogs(dogs.lista))
                    dispatch(originalDogs(dogs.lista))
                })
            }
    }, [notFound])
    
    return (
        <div className={homeCss.totalHome}>
            <h1>Dog Breeds!</h1>

            <Searchs  actualHomeState={actualHomeState} setPage={setPage} setValue={setValue} setNotFound={setNotFound} dispatch={dispatch}/>

            <Buttons actualHomeState={actualHomeState} originalDogsState={originalDogsState} originalDogs={originalDogs} dispatch={dispatch} setNotFound={setNotFound} setPage={setPage} setValue={setValue} filters={filters}/>

            {notFound && <p className={homeCss.p_notFound}>No breeds were found</p>}

            <div className={homeCss.card_filters}>
            <Cards actualHomeState={actualHomeState} page={page} amountPerPage={amountPerPage}/>

            <Filters setNotFound={setNotFound} dispatch={dispatch} setPage={setPage} setValue={setValue} originalDogsState={originalDogsState} filters={filters}/>
            </div>
            
            <div className={homeCss.pagination}>
                <Pagination page={page} setPage={setPage} max={max} value={value} setValue={setValue}/>
            </div>
        </div>  
    )
}

export default Home