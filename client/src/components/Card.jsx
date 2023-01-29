import React from "react";
import { Link } from "react-router-dom";
import cardCss from "../css modules/card.module.css"

function Card ({name, image, temperaments, weight, id}) {
    if (isNaN(weight.substr(0,1))) weight = "Unknown"
    return (
            <div className={cardCss.card}>
                <div className={cardCss.raceContent}>
                    <div className={cardCss.divName}>
                        <h2 className={cardCss.card_name}>
                            <Link to={`/detail/${id}`} >{name}</Link>
                        </h2>
                    </div>
                    <img className={cardCss.card_image} src={image} alt="Race"></img>
                    <div className={cardCss.divTemp}>
                        <h3 className={cardCss.h3Temp}>Temperaments:</h3>
                        <p className={cardCss.pTemp}>{temperaments}</p>
                    </div>
                    <div className={cardCss.divWeight}>
                        <h3 className={cardCss.h3Weight}>Weight:</h3>
                        <p className={cardCss.pWeight}>{weight} kg.</p>
                    </div>
                </div>
            </div>
    )
}

export default Card