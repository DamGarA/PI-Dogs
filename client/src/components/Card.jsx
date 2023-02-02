import React from "react";
import { Link } from "react-router-dom";
import cardCss from "../css modules/card.module.css"

function Card ({name, image, temperaments, weight, id}) {
    //hay algunos perros que no tienen peso, por eso esta verificacion
    if (isNaN(weight.substr(0,1))) weight = "Unknown"
    return (
            <div className={cardCss.card}>
                <Link className={cardCss.unStyledLink} to={`/detail/${id}`} >
                <div className={cardCss.raceContent}>
                    <div className={cardCss.divName}>
                        <h2 className={cardCss.card_name}>{name}</h2>
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
                </Link>
            </div>
    )
}

export default Card