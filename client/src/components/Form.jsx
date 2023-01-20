import React, { useState } from "react";
import { Link } from "react-router-dom";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament,postData } from "./compFunctions/formFunctions.js";
import { useSelector } from 'react-redux'

function Form () {
    const actualFormState = useSelector(state => state.allTemperaments)

    const obj = {
        name: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        temperament: ""
    }

    const [inputs, setInputs] = useState({...obj})

    const [errors, setErrors] = useState({...obj})

    const [temper, setTemper] = useState([])

    return (
    <div>
        <form className={formStyles.form} onSubmit={(e) => postData(e, inputs, temper)}>
        <label className={formStyles.title}>Race attributes</label>
        
        <div className={formStyles.inputcontainer}>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        
        <div className={formStyles.inputcontainer}>
        <input name="temperament" type="text" value={inputs.temperament} onChange={(e) => searchTemperament(e, actualFormState, temper, setTemper, inputs, setInputs)}
        className={formStyles.input} placeholder="Search temperaments..."/>
        </div>

        <button type="submit" className={formStyles.submit} >Create</button>

        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan"], errors)}
        
        </form>
        {temper.length && showTemperaments(temper, setTemper, setInputs, inputs)}
        <Link to={'/home'}>Home</Link>
    </div>
    )
}

export default Form