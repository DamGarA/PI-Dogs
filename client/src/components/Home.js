import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addAllDogs } from "../redux/actions"

 function Home() {
    const dispatch = useDispatch()
    const actualState = useSelector(state => state.allDogs)

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
            {actualState?.map(race => (
                <p>{race.name}</p>
            ))}
        </div>
        
    )
}

export default Home