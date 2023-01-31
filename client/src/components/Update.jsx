import React, { useState, useEffect } from "react";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, updateData, findTemperament} from "./compFunctions/updateFunctions.js";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function Update () {
    const actualFormState = useSelector(state => state.allTemperaments)
    const { id } = useParams()
    
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

    useEffect(() => {
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(res => res.json())
        .then(race => {
            setInputs({
                name: race.race.name,
                minWeight: race.race.weight.slice(0,2).trim(),
                maxWeight: race.race.weight.slice(-2).trim(),
                minHeight: race.race.height.slice(0,2).trim(),
                maxHeight: race.race.height.slice(-2).trim(),
                minLifeSpan: race.race.life_span.slice(0,2).trim(),
                maxLifeSpan: race.race.life_span.slice(-2).trim(),
                temperament: "",
                image: race.race.image
            })
            setTemper([...race.race.temperaments.split(", ")])
        })
    }, [id])

    const [inputs, setInputs] = useState({...obj})
    const [errors, setErrors] = useState({...obj, dataComplete: ""})
    const [temper, setTemper] = useState([])

    return (
    <div className={formStyles.allForm}>
        
        <img src='https://cdn.onemars.net/sites/nutro_es_NkyIN_B9cV/image/204_1615968630478.jpeg' alt='daece' className={formStyles.img_dog}></img>
        <form className={formStyles.form} onSubmit={(e) => updateData(e, inputs, temper, errors, setErrors, id)}>
        <p className={formStyles.title_form}>Update Breed</p>

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

        <button type="submit" className={formStyles.submit} >Update</button>

        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan", "dataComplete", "image"], errors)}
        
        </form>
        
        <div className={formStyles.div_temp}>
        <p className={formStyles.pTemp}>Temperaments:</p>
        {temper.length > 0 && showTemperaments(temper, setTemper, setInputs)}
        <select className={formStyles.selectForm} name="select" id="mySelect" defaultValue="none" onClick={(e) => findTemperament(e, temper, setTemper)}>
            <option value="none">None</option>
           {actualFormState.map((temp, index) => <option key={index} value={`${temp.name}`}>{temp.name}</option>)}
        </select>
        </div>
    </div>
    )
}

export default Update