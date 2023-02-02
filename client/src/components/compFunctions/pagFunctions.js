//siguiente pag
const next = (page, setPage, value, setValue, max) => {
    //la pagina actual no puede ser la ultima y el valor del input tiene que estar en un rango valido
    if (page !== max && value < max && value > 0) {
        setPage(parseInt(page) + 1);
        setValue(parseInt(value) + 1)
    }
}

//pagina anterior
const prev = (page, setPage, value, setValue, max) => {
    //la pagina actual no puede ser la primera y el valor del input tiene que estar en un rango valido
    if(page !== 1 && value <= max && value > 1) {
        setPage(page - 1);
        setValue(value - 1)
    }
}

//maneja los cambios del input
const onChange = (e, setValue) => {
    setValue(e.target.value)
}

//va a la pag cuando apreta enter
const onKeyDown = (e, setPage, max) => {
    const inp = parseInt(e.target.value)
    //si la tecla es ENTER, el valor enviado es un numero y esta en un rango valido
    if (e.keyCode === 13 && typeof inp === "number" && inp > 0 && inp <= max) {
        setPage(inp)
    }
}

//los botones de seleccion de pagina de abajo
const btnSelect = (e, setPage, setValue, max) => {
    const val = parseInt(e.target.value)
    //desactiva el seteo si apreto un boton de una pagina mayor al maximo
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