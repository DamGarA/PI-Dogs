import React from "react";
import cardsCss from "../css modules/cards.module.css";
import Card from "./Card";

function Cards({actualHomeState, page, amountPerPage}) {
    return (
        <div className={cardsCss.racesBlock}>
            {/* El .slice corta el estado actual para que tenga la cantidad necesaria por pagina.  */}
            {actualHomeState?.slice((page - 1) * amountPerPage, (page - 1) * amountPerPage + amountPerPage)
                // el .map renderiza una card por cada uno de los elementos que envia el slice
                .map((race) => ( 
                <Card key={race.id} name={race.name} image={race.image} temperaments={race.temperaments} weight={race.weight}
                id={race.id}/>
            ))}
        </div>
    )
}

export default Cards