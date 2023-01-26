import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import detailStyles from "../css modules/detail.module.css"

function Detail () {
    const [raceId, setRaceId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(race => {
            setRaceId(race.race)
        })
    }, [id])

    return (
        <>
        {raceId &&  <div className={detailStyles.allDetail}>
                        <img className={detailStyles.detail_img} src={raceId.image} alt="Race"></img>
                        <div className={detailStyles.detailAttributes}>
                            <p className={detailStyles.detailTitle}>{raceId.name}</p>
                           
                            <p className={detailStyles.p_detail_title}>Temperaments:</p>
                            <p className={detailStyles.p_detail_value}>{raceId.temperaments}</p>
                            <p className={detailStyles.p_detail_title}>Weight:</p>
                            <p className={detailStyles.p_detail_value}>{raceId.weight} kg.</p>
                            <p className={detailStyles.p_detail_title}>Height:</p>
                            <p className={detailStyles.p_detail_value}>{raceId.height} cm.</p>
                            <p className={detailStyles.p_detail_title}>Life span:</p>
                            <p className={detailStyles.p_detail_value}>{raceId.life_span}</p>
                        </div>
                    </div>
        } 
        </>
    )
}

export default Detail