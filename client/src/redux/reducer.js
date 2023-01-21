import { ADD_ALL_DOGS, ADD_TEMPERAMENTS, ORIGINAL_DOGS} from "./actions.js"

const initialState = {
    allDogs: [],
    allTemperaments: [],
    originalDogs: []
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
        case ORIGINAL_DOGS:
            return {
                ...state,
                originalDogs: action.payload
            }
        default:
            return {...state}
    }
}

export default reducer