import React from "react";
import pagCss from "../css modules/pagination.module.css"
import { next, prev, onChange, onKeyDown } from "./compFunctions/pagFunctions";

function Pagination({page, setPage, max, value, setValue}) {

    return (
        <div className={pagCss.pageDiv}>
            <button onClick={() => prev(page, setPage, value, setValue, max)}>Prev.</button>
            <input 
                className={pagCss.pageInput} 
                value={value} 
                onChange={(e) => onChange(e, setValue)} 
                onKeyDown={(e) => onKeyDown(e, setPage, max)}
            />
            <p>de {max}</p>
            <button onClick={() => next(page, setPage, value, setValue, max)}>Next</button>
        </div>
    )
}

export default Pagination