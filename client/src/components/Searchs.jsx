import React from "react";
import { onKeyDownSearchRace, onKeyDownSearchTemperament } from "./compFunctions/searchsFunctions";
import searchsCss from "../css modules/searchs.module.css"

function Searchs({ actualHomeState, setPage, setValue, setNotFound, dispatch }) {
    return (
        <>
            <span className={searchsCss.span_father}>
            <input className={searchsCss.basic_slide} onKeyDown={(e) => onKeyDownSearchRace(e, actualHomeState, setPage, setValue, setNotFound, dispatch)} placeholder="Search breed..."/>
            <label htmlFor="name ">Breed</label>
            </span>
            
            <span className={searchsCss.span_father}>
            <input className={searchsCss.basic_slide} onKeyDown={(e) => onKeyDownSearchTemperament(e, actualHomeState, setNotFound, setPage, setValue, dispatch)} placeholder="Search temperament..."/>
            <label htmlFor="name ">Temps.</label>
            </span>
        </>
    )
}

export default Searchs