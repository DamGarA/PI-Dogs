import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addAllDogs } from "../redux/actions"
import Pagination from "./pagination"
import styled from "styled-components"

 function Home() {
    const [page, setPage] = useState(1)
    const [amountPerPage, setAmountPerPage] = useState(8)
    const dispatch = useDispatch()
    const actualState = useSelector(state => state.allDogs)
    const max = Math.ceil(actualState.length / amountPerPage) 

    useEffect(() => {
        fetch('http://localhost:3001/dogs')
            .then(res => res.json())
            .then(dogs => {
                dispatch(addAllDogs(dogs.lista))
            })
    }, [dispatch])

    return (
        <div>
            <h1>Home</h1>
            <Pagination page={page} setPage={setPage} max={max}/>
            {actualState
                ?.slice((page - 1) * amountPerPage, (page - 1) * amountPerPage + amountPerPage)
                .map(race => (
                <RaceDiv>
                <RaceContent>
                <EseP>{race.name}</EseP>
                <RaceImg src={race.image}></RaceImg>
                </RaceContent>
                </RaceDiv>
            ))}
        </div>
        
    )
}

const RaceDiv = styled.div`
    display: flex;
    float: left;
    justify-content: space-around
`

const RaceContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


const RaceImg = styled.img`
    max-height:100px;
    max-width: 100px;
`

const EseP = styled.p`
    
`

export default Home