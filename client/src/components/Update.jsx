import React, { useState, useEffect } from "react";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, updateData, findTemperament} from "./compFunctions/updateFunctions.js";
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function Update () {
    const actualFormState = useSelector(state => state.allTemperaments)
    const { id } = useParams()
    
    //modelo para inputs y error
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

    //cuando se renderiza la pagina se pide al back los datos de la raza para ponerlos como valores de los inputs
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
    const [showUpdate, setShowUpdate] = useState(null) //mensaje de actualizacion antes de ir a la pagina principal

    return (
    <div className={formStyles.allForm}>
        
        {/* imagen del perro */}
        <img src='https://cdn.onemars.net/sites/nutro_es_NkyIN_B9cV/image/204_1615968630478.jpeg' alt='daece' className={formStyles.img_dog}></img>
        
         {/* inicio del form con la funcion para enviar la data */}
        <form className={formStyles.form} onSubmit={(e) => updateData(e, inputs, temper, errors, setErrors, id, setShowUpdate)}>
        <p className={formStyles.title_form}>Update Breed</p>

        {/* input del nombre */}
        <div className={formStyles.inputcontainer}>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        {/* inputs de peso, altura y vida */}
        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        
         {/* busqueda de temperamentos por texto */}
        <div className={formStyles.inputcontainer}>
        <input name="temperament" type="text" value={inputs.temperament} onChange={(e) => searchTemperament(e, actualFormState, temper, setTemper, inputs, setInputs)}
        className={formStyles.input} placeholder="Write a temperament..."/>
        </div>

         {/* input de imagen */}
        <div className={formStyles.inputcontainer}>
        <input name="image" type="text" value={inputs.image} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Image URL..."/>
        </div>

        {/* boton de creacion */}
        <button type="submit" className={formStyles.submit} >Update</button>

        {/* errores */}
        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan", "dataComplete", "image"], errors)}
        
        </form>
        
         {/* seccion de temperamentos de la derecha */}
        <div className={formStyles.div_temp}>
        <p className={formStyles.pTemp}>Temperaments:</p> {/* titulo */}

        {/* si hay temperamentos guardados la funcion showTemperaments manda el boton correspondiente */}
        {temper.length > 0 && showTemperaments(temper, setTemper, setInputs)}
        
         {/* selector de temperamentos por lista, con la funcion onclick para poner temperamentos en temper */}
        <select className={formStyles.selectForm} name="select" id="mySelect" defaultValue="none" onClick={(e) => findTemperament(e, temper, setTemper)}>
            
            <option value="none"></option>
            
            {/* Pone como opciones todos los temperamentos existentes */}
            {actualFormState.map((temp, index) => <option key={index} value={`${temp.name}`}>{temp.name}</option>)}
        </select>
        </div>

        {/* muestra un mensaje antes de ir a la pagina principal */}
        {showUpdate && <p className={formStyles.updateAlert}>Updated successfully!!</p>}
    </div>
    )
}

export default Update