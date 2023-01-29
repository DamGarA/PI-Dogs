import React from "react";
import pagCss from "../css modules/pagination.module.css"
import { next, prev, onChange, onKeyDown, btnSelect } from "./compFunctions/pagFunctions";

function Pagination({page, setPage, max, value, setValue}) {
    let newArray
    if (page > 2) newArray = [page - 2, page - 1, page, page + 1, page + 2]
    else if (page === 2) newArray = [page - 1, page, page + 1, page + 2, page + 3]
    else if (page === 1) newArray = [page, page + 1, page + 2, page + 3, page + 4]
    else if (page === max) newArray = [page - 4, page - 3, page -2, page - 1, page]
    else if (page === max - 1) newArray = [page - 3, page - 2, page -1, page, page + 1]
    
    return (
        <div className={pagCss.allPagination}>
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
            <div className={pagCss.pageDivBottom}>
                <button className={pagCss.pageOne} value={1} onClick={(e) => btnSelect(e, setPage, setValue, max)}>1</button>
                {newArray.map((numberPage, index) => {
                    if (numberPage === page) {
                        return <button key={index} className={pagCss.actualPage} value={numberPage} onClick={(e) => btnSelect(e, setPage, setValue, max)}>{numberPage}</button>
                    }
                    else return <button key={index} className={pagCss.otherPages} value={numberPage} onClick={(e) => btnSelect(e, setPage, setValue, max)}>{numberPage}</button>
                })}
                <button className={pagCss.lastPage} value={max} onClick={(e) => btnSelect(e, setPage, setValue, max)}>{max}</button>
            </div>
        </div>
    )
}

export default Pagination