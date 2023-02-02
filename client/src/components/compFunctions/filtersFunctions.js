import { addAllDogs } from "../../redux/actions";

// const filterByOriginAndWeight = (e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters) => {
//     //cada caso en el switch setea la posicion de filtros en donde se va a guardar la data (0, 1) y el valor para el input radio (2,3)
//     switch (e.target.value) {
//         case "my-races":
//             filters[0] = originalDogsState.filter(race => race.id < 300);
//             filters[2] = "my-races";
//             break;
//         case "api-races":
//             filters[0] = originalDogsState.filter(race => race.id > 300);
//             filters[2] = "api-races";
//             break;
//         case "none-races":
//             filters[0] = [...originalDogsState];
//             filters[2] = "none-races"
//             break;
//         case "light-weight":
//             filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 < 12);
//             filters[3] = "light-weight";
//             break;
//         case "medium-weight":
//             filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 >= 12 && (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 <= 30);
//             filters[3] = "medium-weight";
//             break;
//         case "heavy-weight":
//             filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 > 30)
//             filters[3] = "heavy-weight";
//             break;
//         case "none-weight":
//             filters[1] = [...originalDogsState];
//             filters[3] = "none-weight";
//             break;
//         default:
//             return
//     }
   
//     let show = []
    
//     //si se ha guardado algo adentro de algunas de las posiciones del filters, se guarda la data adentro de show para mostrarla
//     if (filters[0] !== "none") {
//         show[0] = [...filters[0]]
//     }
//     if (filters[1] !== "none") {
//         show[1] = [...filters[1]]
//     }

//     //si ambas posiciones del show tienen data, filtra el show[0]. si encuentra(.find) una coincidencia dentro del show[1] devuelve true y esa raza se guarda en show2.
//     if (show[0] && show[1]) {
//         let show2 = show[0].filter(race1 => show[1].find(race2 => race2.id === race1.id));
//     //si show2 dos no tiene nada es porq no hubo coincidencias y se setea el notFound para que muestre la alerta correspondiente
//        if (show2.length === 0) {
//         setNotFound(prev => prev + 1)
//         }
//     //sino se actualiza el estado con show2, se saca la alerta si existia y se setea pagina y valor de pagina
//        else {
//         dispatch(addAllDogs(show2))
//         setNotFound(false)
//         }
//         setPage(1)
//         setValue(1)      
//     }
//     //si no hay valores en ambos show (0 y 1) se actualiza con uno o con el otro, donde haya
//     else if (show[0]) {
//         dispatch(addAllDogs(show[0]))
//         setPage(1)
//         setValue(1)  
//     }
//     else if (show[1]) {
//         dispatch(addAllDogs(show[1]))
//         setPage(1)
//         setValue(1)  
//     }   
// }

const filterByOriginAndWeight = (e, setNotFound, dispatch, setPage, setValue, originalDogsState, filters) => {
    //cada caso en el switch setea la posicion de filtros en donde se va a guardar la data (0, 1) y el valor para el input radio (2,3)
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
            filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 < 12);
            filters[3] = "light-weight";
            break;
        case "medium-weight":
            filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 >= 12 && (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 <= 30);
            filters[3] = "medium-weight";
            break;
        case "heavy-weight":
            filters[1] = originalDogsState.filter(dog => (parseInt(dog.weight.substr(-2).trim()) + parseInt(dog.weight.substr(0,2).trim())) / 2 > 30)
            filters[3] = "heavy-weight";
            break;
        case "none-weight":
            filters[1] = [...originalDogsState];
            filters[3] = "none-weight";
            break;
        default:
            return
    }
   
    let show = [[...originalDogsState],[...originalDogsState]]
    
    //si se ha guardado algo adentro de algunas de las posiciones del filters, se guarda la data adentro de show para mostrarla
    if (filters[0] !== "none") {
        show[0] = [...filters[0]]
    }
    if (filters[1] !== "none") {
        show[1] = [...filters[1]]
    }

    // busca las coincidencias entre ambos filtros
    const intersection = show[0].filter(obj1 => 
        show[1].some(obj2 => 
          obj2.id === obj1.id
        ) 
      );
    
    //si no encontro coincidencias muestra la alerta
    if (intersection.length === 0) {
        setNotFound(prev => prev + 1)  
    } else { //sino actualiza el estado de redux
        dispatch(addAllDogs(intersection))
        setNotFound(false)
        setPage(1)
        setValue(1)
    } 
}

export { filterByOriginAndWeight }