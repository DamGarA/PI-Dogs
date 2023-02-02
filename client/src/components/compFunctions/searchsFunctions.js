import { addAllDogs } from "../../redux/actions";

//busca raza por nombre
const onKeyDownSearchRace = (e, actualHomeState, setPage, setValue, setNotFound, dispatch) => {
    //si se manda con un ENTER...
    if (e.keyCode === 13) {
        try {
            //busca una raza con el valor buscado
            fetch(`http://localhost:3001/dogs?name=${e.target.value}`)
            .then(res => res.json())
            .then(dogs => {
                //hace un filtro de las razas recibidas
                const newArray = dogs.lista.filter(elem1=> {
                    //por cada una de las razas recibidas, busca la coincidencia con el estado actual que esta en redux
                    return actualHomeState.some(elem2 => elem1.name === elem2.name)
                });
                //si no se encuentran razas lanza el error para la alerta
                if (newArray.length === 0) throw Error("No breeds were found")
                 //se actualizan las paginas y se manda el estado a redux
                    setPage(1)
                    setValue(1)
                    setNotFound(false)
                    dispatch(addAllDogs(newArray))   
            })
            .catch(() => {
                //se setea la alerta cuando no encuentra resultados
                setNotFound(true)
            })     
        } catch (err) {
            setNotFound(true)
        }  
    }
}

//busca razas por temperamentos
const onKeyDownSearchTemperament = (e, actualHomeState, setNotFound, setPage, setValue, dispatch) => {
    //si se manda un ENTER
    if (e.keyCode === 13) {
        
        //filtra el estado actual de razas
        const newArray = actualHomeState.filter(dog => {
            //si la raza tiene temperamentos...
            if (dog.temperaments) {
                //busca la coincidencia entre las string de temperamentos y el valor enviado
                return dog.temperaments.toUpperCase().includes(e.target.value.toUpperCase())
            }
            //si no hay coincidencias devuelve false para que la raza no se sume
            return false
        })
        //si no se encuentran razas setea la alerta
        if (newArray.length === 0) {
            setNotFound(true)
        } else {
            //si se encuentran coincidencias setea la pagina y actualiza el estado de redux
            setPage(1)
            setValue(1)
            setNotFound(false)
            dispatch(addAllDogs(newArray))
        }  
    }
}

export {onKeyDownSearchRace, onKeyDownSearchTemperament}