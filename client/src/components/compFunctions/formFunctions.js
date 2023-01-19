import formStyles from "../../css modules/form.module.css"

function validate (inputs) {
    let errors = {};
    
    if (!inputs.name) {
        errors.name = "Invalid name"
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

export {validate, handleChanges, divMinMax, errorMessage}