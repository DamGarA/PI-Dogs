import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import detailStyles from "../css modules/detail.module.css"
import { deleteBreed } from "./compFunctions/detailFunctions";

function Detail () {
    const [raceId, setRaceId] = useState(null)
    const [showDelete, setShowDelete] = useState(null)
    const { id } = useParams()

    //se busca la raza por id en la base de datos y se guarda en raceId
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
                            <p className={detailStyles.p_detail_value}>{raceId.life_span} years</p>
                        </div>
                        {/* cuando la raza es creada, se renderizan los botones de delete y update */}
                        {id < 300 && <button className={detailStyles.deleteBtn} onClick={() => deleteBreed(id, setShowDelete)}>Delete Breed</button>}
                        {id < 300 && <Link to={`/update/${id}`}><button className={detailStyles.updateBtn}>Update Breed</button></Link>}

                        {/* muestra el mensaje en pantalla antes de ir a la pag principal */}
                        {showDelete && <p className={detailStyles.deleteAlert}>Delete successfully!!</p>}
                    </div>     
        } 
        </>
    )
}

export default Detail