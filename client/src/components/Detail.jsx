import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import homeCss from "../css modules/home.module.css"

function Detail () {
    const [raceId, setRaceId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(race => {
            setRaceId(race.race[0])
            console.log(race)
        })
    }, [id])

    return (
        <>
        {raceId &&  <div className={homeCss.racesContainer}>
                        <div className={homeCss.raceContent}>
                            <p>{raceId.name}</p>
                            <img className={homeCss.raceImg} src={raceId.image} alt="Race"></img>
                            <p className={homeCss.temp}>Temperaments:{raceId.temperaments}</p>
                            <p>Weight:{raceId.weight}</p>
                        </div>
                    </div>
        }
        <Link to={'/home'}>Home</Link>   
        </>
    )
}

export default Detail