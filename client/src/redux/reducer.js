import { ADD_ALL_DOGS, ADD_TEMPERAMENTS} from "./actions.js"

const initialState = {
    allDogs: [],
    allTemperaments: []
}

 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_DOGS:
            return {
                ...state,
                allDogs: action.payload
            }
        case ADD_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer