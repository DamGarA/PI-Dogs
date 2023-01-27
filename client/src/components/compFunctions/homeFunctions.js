import { addAllDogs } from "../../redux/actions";

const onKeyDownSearchRace = (e, actualHomeState, setPage, setValue, setNotFound, dispatch) => {
    if (e.keyCode === 13) {
        try {
            fetch(`http://localhost:3001/dogs?name=${e.target.value}`)
            .then(res => res.json())
            .then(dogs => {
                const newArray = dogs.lista.filter(elem1=> {
                    return actualHomeState.some(elem2 => elem1.name === elem2.name)
                });
                    setPage(1)
                    setValue(1)
                    setNotFound(false)
                    dispatch(addAllDogs(newArray))   
            })
            .catch(() => {
                setNotFound(true)
            })     
        } catch (err) {
            setNotFound(true)
        }  
    }
}

export {onKeyDownSearchRace}