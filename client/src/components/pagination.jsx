import React from "react";
import pagCss from "../css modules/pagination.module.css"
import { next, prev, onChange, onKeyDown } from "./compFunctions/pagFunctions";

function Pagination({page, setPage, max, value, setValue}) {

    return (
        <div className={pagCss.pageDiv}>
            <button className={pagCss.btn_prev_next} onClick={() => prev(page, setPage, value, setValue, max)}>Prev.</button>
            <input 
                className={pagCss.pageInput} 
                value={value} 
                onChange={(e) => onChange(e, setValue)} 
                onKeyDown={(e) => onKeyDown(e, setPage, max)}
            />
            <p className={pagCss.pagP}>de {max}</p>
            <button className={pagCss.btn_prev_next} onClick={() => next(page, setPage, value, setValue, max)}>Next</button>
        </div>
    )
}

export default Pagination