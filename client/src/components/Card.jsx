import React from "react";
import { Link } from "react-router-dom";
import cardCss from "../css modules/card.module.css"

function Card ({name, image, temperaments, weight, id}) {
    return (
        
            <div className={cardCss.card}>
                <div className={cardCss.raceContent}>
                <h2 className={cardCss.card_name}>
                <Link to={`/detail/${id}`} >{name}</Link>
                </h2>
                <img className={cardCss.card_image} src={image} alt="Race"></img>
                <h3>Temperaments:</h3>
                <ul className={cardCss.card_temperaments}>
                    {typeof temperaments == "string" && temperaments.split(", ").map((temp, index) => <p key={index} className={cardCss.temperament}>{temp}</p>)}
                </ul>
                <p>Weight:{weight}</p>
                </div>
            </div>
        
    )
}

export default Card