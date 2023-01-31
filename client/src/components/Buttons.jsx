import React from "react";
import buttonsCss from "../css modules/buttons.module.css"
import { resetDogs, sortByWeightMinToMax, sortByWeightMaxToMin, sortByNameAtoZ, sortByNameZtoA } from "./compFunctions/buttonsFunctions";

function Buttons ({ actualHomeState, dispatch, setNotFound, setPage, setValue, filters }) {
    return (
        <>
            <button className={buttonsCss.btn_sort} onClick={() => resetDogs(dispatch, setNotFound, setPage, setValue, filters)}>All dogs</button>
            <button className={buttonsCss.btn_sort} onClick={() => sortByWeightMinToMax(actualHomeState, setNotFound, dispatch)}>Weight asc.</button>
            <button className={buttonsCss.btn_sort} onClick={() => sortByWeightMaxToMin(actualHomeState, setNotFound, dispatch)}>Weight desc.</button>
            <button className={buttonsCss.btn_sort} onClick={() => sortByNameAtoZ(actualHomeState, setNotFound, dispatch)}>A to Z</button>
            <button className={buttonsCss.btn_sort} onClick={() => sortByNameZtoA(actualHomeState, setNotFound, dispatch)}> Z to A</button>
        </>
    )
}

export default Buttons