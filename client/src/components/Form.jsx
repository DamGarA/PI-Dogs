import React, { useState } from "react";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, postData, findTemperament} from "./compFunctions/formFunctions.js";
import { useSelector } from 'react-redux'
import { Redirect } from "react-router-dom";

function Form () {
    const actualFormState = useSelector(state => state.allTemperaments)
    
    //modelo para inputs y errors
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

    const [inputs, setInputs] = useState({...obj}) //valor de los inputs
    const [errors, setErrors] = useState({...obj, dataComplete: ""}) //errores
    const [temper, setTemper] = useState([]) //temperamentos seleccionados para la raza
    const [showCreated, setShowCreated] = useState(false) //estado para redirigir hacia el componente BreedCreated una vez que se hace el envio de informacion

    return (
    <div className={formStyles.allForm}>
        
        {/* imagen del perro */}
        <img src='https://wallpapershome.com/images/pages/pic_h/1533.jpg' alt='daece' className={formStyles.img_dog}></img>

        {/* inicio del form con la funcion para enviar la data */}
        <form className={formStyles.form} onSubmit={(e) => postData(e, inputs, temper, errors, setErrors, setShowCreated)}>

        <p className={formStyles.title_form}>Create Breed</p>

        {/* input del nombre */}
        <div>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        {/* inputs de peso, altura y vida */}
        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        
        {/* busqueda de temperamentos por texto */}
        <div>
        <input name="temperament" type="text" value={inputs.temperament} onChange={(e) => searchTemperament(e, actualFormState, temper, setTemper, inputs, setInputs)}
        className={formStyles.input} placeholder="Write a temperament..."/>
        </div>

        {/* input de imagen */}
        <div>
        <input name="image" type="text" value={inputs.image} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Image URL..."/>
        </div>

        {/* boton de creacion */}
        <button type="submit" className={formStyles.submit} >Create</button>

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

        {/* Hace la redireccion al otro componente si postData tuvo exito */}
        {showCreated && <Redirect to={showCreated} />}
    </div>
    )
}

export default Form