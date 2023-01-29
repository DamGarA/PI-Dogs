import { addAllDogs } from "../../redux/actions";

const filterByOriginAndWeight = (e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters) => {
    switch (e.target.value) {
        case "my-races":
            filters[0] = originalDogsState.filter(race => race.id < 300);
            filters[2] = "my-races";
            break;
        case "api-races":
            filters[0] = originalDogsState.filter(race => race.id > 300);
            filters[2] = "api-races";
            break;
        case "none-races":
            filters[0] = [...originalDogsState];
            filters[2] = "none-races"
            break;
        case "light-weight":
            filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) < 12);
            filters[3] = "light-weight";
            break;
        case "medium-weight":
            filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) >= 12 && parseInt(dog.weight.substr(-2).trim()) <= 30);
            filters[3] = "medium-weight";
            break;
        case "heavy-weight":
            filters[1] = originalDogsState.filter(dog => parseInt(dog.weight.substr(-2).trim()) > 30)
            filters[3] = "heavy-weight";
            break;
        case "none-weight":
            filters[1] = [...originalDogsState];
            filters[3] = "none-weight";
            break;
        default:
            return
    }
   
    let show = []
    
    if (filters[0] !== "none") {
        show[0] = [...filters[0]]
    }
    if (filters[1] !== "none") {
        show[1] = [...filters[1]]
    }
    if (show[0] && show[1]) {
        let show2 = show[0].filter(race1 => show[1].find(race2 => race2.id === race1.id));
       if (show2.length === 0) setNotFound(true)
       else {
        dispatch(addAllDogs(show2))
        setNotFound(false)
        }
        setPage(1)
        setValue(1)      
    }
    else if (show[0]) {
        dispatch(addAllDogs(show[0]))
        setPage(1)
        setValue(1)  
    }
    else if (show[1]) {
        dispatch(addAllDogs(show[1]))
        setPage(1)
        setValue(1)  
    }   
}

export { filterByOriginAndWeight}