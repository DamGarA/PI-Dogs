import React, { useState } from "react";
import { Link } from "react-router-dom";
import formStyles from "../css modules/form.module.css"
import { handleChanges, divMinMax, errorMessage } from "./compFunctions/formFunctions.js";
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

    const postData = (e) => {
        e.preventDefault()
        const weight = `${inputs.minWeight} - ${inputs.maxWeight}`;
        const height = `${inputs.minHeight} - ${inputs.maxHeight}`;
        const life_span = `${inputs.minLifeSpan} - ${inputs.maxLifeSpan}`;
        fetch('http://localhost:3001/dogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: inputs.name,
                weight,
                height,
                life_span,
                temperaments: []
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //aca puedo hacer algo con la raza recien creada
        })
        .catch(err => console.log(err))
    }

    // const searchTemperament = (e) => {
        
    //     console.log(inputs.temperament)
    //     actualFormState?.forEach(temp => {
    //         if (temp.name.toUpperCase() == e.target.value.toUpperCase()) {
    //             setTemper([...temper, `${e.target.value}`])
    //             console.log("coinciden")
    //             setInputs({...inputs, [e.target.name]: e.target.value})
    //         } 
    //     })
        
    // }

    const searchTemperament = (e) => {
        const tempTemperament = e.target.value;
        actualFormState?.forEach(temp => {
            if (temp.name.toUpperCase() == tempTemperament.toUpperCase()) {
                setTemper([...temper, `${tempTemperament}`])
                console.log("coinciden")
            } 
        });
        setInputs({...inputs, [e.target.name]: tempTemperament});
        console.log(inputs.temperament)
    }
    

    const showTemperaments = () => {
        console.log("show")
       return temper.map(temp => <p className={formStyles.warningP}>{temp}</p>)
    }

    const mostrar = () => {
        console.log(temper)
        console.log(actualFormState)
    }

    return (
    <div>
        <form className={formStyles.form} onSubmit={(e) => postData(e)}>
        <label className={formStyles.title}>Create Race</label>
        
        <div className={formStyles.inputcontainer}>
        <input name="name" type="text" value={inputs.name} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}
        className={formStyles.input} placeholder="Race name..."/>
        </div>

        {divMinMax("minWeight", "maxWeight", "weight", inputs, setInputs, setErrors)}

        {divMinMax("minHeight", "maxHeight", "height", inputs, setInputs, setErrors)}

        {divMinMax("minLifeSpan", "maxLifeSpan", "life span", inputs, setInputs, setErrors)}
        
        <div className={formStyles.inputcontainer}>
        <input name="temperament" type="text" value={inputs.temperament} onChange={(e) => searchTemperament(e)}
        className={formStyles.input} placeholder="Search temperaments..."/>
        </div>

        <button type="submit" className={formStyles.submit} >Submit</button>

        {errorMessage(["name", "minWeight","maxWeight", "minHeight", "maxHeight","minLifeSpan","maxLifeSpan"], errors)}
        
        {temper.length && showTemperaments()}
        
        </form>
        <button onClick={mostrar}>mostrar</button>
        <Link to={'/home'}>Home</Link>
    </div>
    )
}

export default Form