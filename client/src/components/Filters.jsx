import React from "react";
import filterStyles from "../css modules/filters.module.css"

function Filters({filterByOriginAndWeight}) {
    return (
        <div className={filterStyles.filter_box}>
            
            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="my-races">My        Breeds</label>
            <input className={filterStyles.filter_input} type="radio" id="my-races" name="race" value="my-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="api-races">API Breeds</label>
            <input type="radio" id="api-races" name="race" value="api-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="none">None Breeds</label>
            <input type="radio" id="none" name="race" value="none-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>
            <hr></hr>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="light-weight">Light weight</label>
            <input type="radio" id="light-weight" name="weight" value="light-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="medium-weight">Medium weight</label>
            <input type="radio" id="medium-weight" name="weight" value="medium-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="heavy-weight">Heavy weight</label>
            <input type="radio" id="heavy-weight" name="weight" value="heavy-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>

            <div className={filterStyles.each_filter}>
            <label className={filterStyles.filter_label} htmlFor="none-weight">None weight</label>
            <input type="radio" id="none-weight" name="weight" value="none-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            </div>
            
        </div>
    )
}

export default Filters