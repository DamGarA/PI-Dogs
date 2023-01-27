import React, { useState } from "react";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, postData, findTemperament} from "./compFunctions/formFunctions.js";
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

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
        temperament: "",
        image:""
    }

    const [inputs, setInputs] = useState({...obj})
    const [errors, setErrors] = useState({...obj, dataComplete: ""})
    const [temper, setTemper] = useState([])
    const [showCreated, setShowCreated] = useState(false)

    return (
    <div className={formStyles.allForm}>
        
        <img src='https://wallpapershome.com/images/pages/pic_h/1533.jpg' alt='daece' className={formStyles.img_dog}></img>
        <form className={formStyles.form} onSubmit={(e) => postData(e, inputs, temper, errors, setErrors, setShowCreated)}>
        <label className={formStyles.title}>Create Breed</label>

        <div className={formStyles.inputcontainer}>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        
        <div className={formStyles.inputcontainer}>
        <input name="temperament" type="text" value={inputs.temperament} onChange={(e) => searchTemperament(e, actualFormState, temper, setTemper, inputs, setInputs)}
        className={formStyles.input} placeholder="Write a temperament..."/>
        </div>

        <div className={formStyles.inputcontainer}>
        <input name="image" type="text" value={inputs.image} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Image URL..."/>
        </div>

        <button type="submit" className={formStyles.submit} >Create</button>

        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan", "dataComplete", "image"], errors)}
        
        </form>
        
        <div className={formStyles.div_temp}>
        <p className={formStyles.pTemp}>Temperaments:</p>
        {temper.length > 0 && showTemperaments(temper, setTemper, setInputs)}
        <select name="select" id="mySelect" defaultValue="none" onClick={(e) => findTemperament(e, temper, setTemper)}>
            <option value="none">None</option>
           {actualFormState.map((temp, index) => <option key={index} value={`${temp.name}`}>{temp.name}</option>)}
        </select>
        </div>

        {showCreated && <Redirect to={showCreated} />}
    </div>
    )
}

export default Form