import formStyles from "../../css modules/form.module.css"

function validate (inputs) {
    let errors = {};
    
    if (!inputs.name) {
        errors.name = "Invalid name"
    }
    else if (!/^[a-zA-Z\s]+$/.test(inputs.name)) {
        errors.name = "Invalid name, only letters are allowed"
    }
    else if (parseInt(inputs.minWeight) < 1 && inputs.minWeight !== "") {  
        errors.minWeight = "Invalid minimum weight"
    }
    else if (parseInt(inputs.maxWeight) <= parseInt(inputs.minWeight) && inputs.maxWeight !== "") {
        errors.minWeight = "Invalid maximum weight"
    }
    else if (parseInt(inputs.minHeight) < 1 && inputs.minHeight !== "") {
        errors.minHeight = "Invalid minimum height"
    }
    else if (parseInt(inputs.maxHeight) <= parseInt(inputs.minHeight) && inputs.maxHeight) {
        errors.minHeight = "Invalid maximum height"
    }
    else if (parseInt(inputs.minLifeSpan) < 1 && inputs.minLifeSpan !== "") {
        errors.minLifeSpan = "Invalid minimum life span"
    }
    else if (parseInt(inputs.maxLifeSpan) <= parseInt(inputs.minLifeSpan) && inputs.maxLifeSpan) {
        errors.maxLifeSpan = "Invalid maximum life span"
    }
    else if (!/(\.jpg|\.jpeg|\.png|\.gif)$/.test(inputs.image) && inputs.image !== "") {
        errors.image = "Supported files: .jpg .jpeg .png .gif"
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
    return errorValue.map((val, index) => errors[val] && <p key={index} className={formStyles.warningP}>{errors[val]}</p>)
}

const showTemperaments = (temper, setTemper, setInputs) => {
    return temper.map((tempName, index) => {
        return <button key={index} className={formStyles.temperamentBtn} onClick={() => deleteTemp(tempName, setTemper, setInputs, temper)}>{tempName}</button>
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
            if (!temper.includes(saveTemper)) {
                setTemper([...temper, `${saveTemper}`])
            }
        } 
    });
   
}

const postData = (e, inputs, temper, errors, setErrors, setShowCreated) => {
    e.preventDefault()
    if (!Object.values(errors).some(Boolean) && inputs.minWeight && inputs.maxWeight && inputs.minHeight && inputs.maxHeight && inputs.minLifeSpan && inputs.maxLifeSpan && inputs.name)
    {
    const weight = `${inputs.minWeight} - ${inputs.maxWeight}`;
    const height = `${inputs.minHeight} - ${inputs.maxHeight}`;
    const life_span = `${inputs.minLifeSpan} - ${inputs.maxLifeSpan}`;

    const body = {
        name: inputs.name,
        weight,
        height,
        life_span,
        temperaments: temper,
    }
    if (inputs.image !== "") {
        body.image = inputs.image;
    }

    fetch('http://localhost:3001/dogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .then(data => {      
        setShowCreated(`/breedCreated/${data.dog.id}`)
    })
    .catch((err) => {    
        console.log(err)
        setErrors({dataComplete:err.message})
    })
    }
    else setErrors({dataComplete:"Invalid data"})
}

const findTemperament = (e, temper, setTemper) => {
    if (e.target.value !== "none" && !temper.includes(e.target.value)) setTemper([...temper, e.target.value]);
    const select = document.getElementById("mySelect");
    select.value = "none"
}

export {validate, handleChanges, divMinMax, errorMessage, showTemperaments, searchTemperament, postData, findTemperament}