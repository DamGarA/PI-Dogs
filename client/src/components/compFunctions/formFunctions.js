import formStyles from "../../css modules/form.module.css"

function validate (inputs) {
    let errors = {};
    
    if (!inputs.name) {
        errors.name = "Invalid name"
    }
    else if (!/^[a-zA-Z]+$/.test(inputs.name)) {
        errors.name = "Invalid name, only letters are allowed"
    }
    else if (inputs.minWeight < 1) {
        errors.minWeight = "Invalid minimum weight"
    }
    else if (inputs.maxWeight <= inputs.minWeight) {
        errors.minWeight = "Invalid maximum weight"
    }
    else if (inputs.minHeight < 1) {
        errors.minHeight = "Invalid minimum height"
    }
    else if (inputs.maxHeight <= inputs.minHeight) {
        errors.minHeight = "Invalid maximum height"
    }
    else if (inputs.minLifeSpan < 1) {
        errors.minLifeSpan = "Invalid minimum life span"
    }
    else if (inputs.maxLifeSpan <= inputs.minLifeSpan) {
        errors.maxLifeSpan = "Invalid maximum life span"
    }

    return errors
}

const handleChanges = (e, setInputs, setErrors, inputs) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
    setErrors(validate({...inputs, [e.target.name]: e.target.value}))
}

const divMinMax = (minValue, maxValue, placeHolder, inputs, setInputs, setErrors) => {
    
    return (
        <div className={formStyles.inputcontainer}>
            <div className={formStyles.input_half}>
                <input name={minValue} type="number" value={inputs[minValue]} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}  className={formStyles.input} placeholder={`Min ${placeHolder}...`}/>
            </div>
            <div className={formStyles.input_half}>
                <input name={maxValue} type="number" value={inputs[maxValue]} onChange={(e) => handleChanges(e, setInputs, setErrors, inputs)}  className={formStyles.input} placeholder={`Max ${placeHolder}...`}/>
            </div>
        </div>
    )
}

const errorMessage = (errorValue, errors) => {
    return errorValue.map(val => errors[val] && <p className={formStyles.warningP}>{errors[val]}</p>)
}

const showTemperaments = (temper, setTemper, setInputs, inputs) => {
    return temper.map(tempName => {
        return <button className={formStyles.temperamentBtn} onClick={() => deleteTemp(tempName, setTemper, setInputs, temper)}>{tempName}</button>
    })
 }

 const deleteTemp = (tempName, setTemper, setInputs,temper) => {
     setTemper(temper.filter(temp => temp !== tempName))
     setInputs(prevInputs => ({...prevInputs, temperament: ""}))

 }

 const searchTemperament = (e, actualFormState, temper, setTemper, inputs, setInputs) => {
    const tempTemperament = e.target.value;
    setInputs({...inputs, [e.target.name]: tempTemperament});
    actualFormState?.forEach(temp => {
        if (temp.name.toUpperCase() === tempTemperament.toUpperCase()) {
            const saveTemper = tempTemperament[0].toUpperCase() + tempTemperament.slice(1).toLowerCase()
            if (!temper.includes(saveTemper)) setTemper([...temper, `${saveTemper}`])
        } 
    });
   
}

const postData = (e, inputs, temper) => {
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
            temperaments: temper
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        //aca puedo hacer algo con la raza recien creada
    })
    .catch(err => console.log(err))
}

export {validate, handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, postData}