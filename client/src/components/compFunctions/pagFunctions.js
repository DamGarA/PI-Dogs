const next = (page, setPage, value, setValue, max) => {
    if (page !== max && value < max && value > 0) {
        
        setPage(parseInt(page) + 1);
        setValue(parseInt(value) + 1)
    }
}

const prev = (page, setPage, value, setValue, max) => {
    if(page !== 1 && value <= max && value > 1) {
        setPage(page - 1);
        setValue(value - 1)
    }
}

const onChange = (e, setValue) => {
    setValue(e.target.value)
}

const onKeyDown = (e, setPage, max) => {
    const inp = parseInt(e.target.value)
    if (e.keyCode === 13 && typeof inp === "number" && inp > 0 && inp <= max) {
        setPage(inp)
    }
}

const btnSelect = (e, setPage, setValue, max) => {
    const val = parseInt(e.target.value)
    if (val <= max) {
        setPage(val)
        setValue(val)
    }
}

module.exports = {
    next,
    prev,
    onChange,
    onKeyDown,
    btnSelect
}