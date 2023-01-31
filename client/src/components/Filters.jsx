import React from "react";
import filterStyles from "../css modules/filters.module.css"
import { filterByOriginAndWeight } from "./compFunctions/filtersFunctions";

function Filters({ setNotFound, dispatch, setPage, setValue, originalDogsState, filters}) {
    return (

        <div className={filterStyles.filter_box}>
            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>My Breeds</p>
            <input className={filterStyles.filter_input} type="radio" name="race" value="my-races" checked={filters[2] === "my-races"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>API Breeds</p>
            <input type="radio" name="race" value="api-races" checked={filters[2] === "api-races"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>None Breeds</p>
            <input type="radio" name="race" value="none-races" checked={filters[2] === "none-races"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>Light weight</p>
            <input type="radio" name="weight" value="light-weight" checked={filters[3] === "light-weight"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>Medium weight</p>
            <input type="radio" name="weight" value="medium-weight" checked={filters[3] === "medium-weight"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>Heavy weight</p>
            <input type="radio" name="weight" value="heavy-weight" checked={filters[3] === "heavy-weight"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <p className={filterStyles.filter_label}>None weight</p>
            <input type="radio" name="weight" value="none-weight" checked={filters[3] === "none-weight"} onChange={(e) => filterByOriginAndWeight(e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters)}/>
            </div>  
        </div>
    )
}

export default Filters