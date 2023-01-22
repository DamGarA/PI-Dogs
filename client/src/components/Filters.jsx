import React from "react";

function Filters({filterByOriginAndWeight}) {
    return (
        <div>
           <label htmlFor="race-selector">Select a race:</label>
            <input type="radio" id="my-races" name="race" value="my-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="my-races">My races</label>
            <input type="radio" id="api-races" name="race" value="api-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="api-races">API races</label>
            <input type="radio" id="none" name="race" value="none-races" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="none">None races</label>

            <label htmlFor="weight-selector">Select a weight:</label>
            <input type="radio" id="light-weight" name="weight" value="light-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="light-weight">Light weight</label>
            <input type="radio" id="medium-weight" name="weight" value="medium-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="medium-weight">Medium weight</label>
            <input type="radio" id="heavy-weight" name="weight" value="heavy-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="heavy-weight">Heavy weight</label>
            <input type="radio" id="none-weight" name="weight" value="none-weight" onChange={(e) => filterByOriginAndWeight(e)}/>
            <label htmlFor="none-weight">None weight</label>
        </div>
    )
}

export default Filters