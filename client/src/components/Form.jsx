import React, { useState } from "react";
import { Link } from "react-router-dom";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage } from "./compFunctions/formFunctions.js";

function Form () {
    const obj = {
        name: "",
        minWeight: "",
        maxWeight: "",
        minHeight: "",
        maxHeight: "",
        minLifeSpan: "",
        maxLifeSpan: "",
        message: ""
    }

    const [inputs, setInputs] = useState({...obj})

    const [errors, setErrors] = useState({...obj})

    return (
    <div>
        <form className={formStyles.form}>
        <label className={formStyles.title}>Create Race</label>
        
        <div className={formStyles.inputcontainer}>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        
        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        

        <textarea name="message" type="text" value={inputs.message} onChange={handleChanges}  className={formStyles.textarea} placeholder="Your Message..."/>

        <button type="submit" className={formStyles.submit}>Submit</button>

        {/* {errors.name && <p className={formStyles.warningP}>{errors.name}</p>} */}
        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan"], errors)}


        {/* {errors.minWeight && <p className={formStyles.warningP}>{errors.minWeight}</p>}
        {errors.maxWeight && <p className={formStyles.warningP}>{errors.maxWeight}</p>}
        {errors.minHeight && <p className={formStyles.warningP}>{errors.minHeight}</p>}
        {errors.maxHeight && <p className={formStyles.warningP}>{errors.maxHeight}</p>}
        {errors.minLifeSpan && <p className={formStyles.warningP}>{errors.minLifeSpan}</p>}
        {errors.maxLifeSpan && <p className={formStyles.warningP}>{errors.maxLifeSpan}</p>} */}
        
        {errors.subject && <p className={formStyles.warningP}>{errors.subject}</p>}
        {errors.message && <p className={formStyles.warningP}>{errors.message}</p>}
        </form>
        <Link to={'/home'}>Home</Link>
    </div>
    )
}

export default Form