import React from "react";
import { Link } from "react-router-dom";
import homeCss from "../css modules/home.module.css"

function Card ({name, image, temperaments, weight, id}) {
    return (
        
            <div className={homeCss.racesContainer}>
                <div className={homeCss.raceContent}>
                <Link to={`/detail/${id}`}>{name}</Link>
                <img className={homeCss.raceImg} src={image}></img>
                <p className={homeCss.temp}>Temperaments:{temperaments}</p>
                <p>Weight:{weight}</p>
                </div>
            </div>
        
    )
}

export default Card