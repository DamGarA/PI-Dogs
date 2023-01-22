import React from "react";
import homeCss from "../css modules/home.module.css"
import Card from "./Card";

function Cards({actualHomeState, page, amountPerPage}) {
    return (
        <div className={homeCss.racesBlock}>
            {actualHomeState?.slice((page - 1) * amountPerPage, (page - 1) * amountPerPage + amountPerPage)
                .map(race => (
                <>
                <Card name={race.name} image={race.image} temperaments={race.temperaments} weight={race.weight}
                id={race.id}/>
                </>
            ))}
        </div>
    )
}

export default Cards