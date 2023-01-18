import { ADD_ALL_DOGS} from "./actions.js"

const initialState = {
    allDogs: []
}

 const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALL_DOGS:
            return {
                allDogs: [...action.payload]
            }
        default:
            return {...state}
    }
}

export default reducer