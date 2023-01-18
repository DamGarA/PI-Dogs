export const ADD_ALL_DOGS = 'ADD_CHARACTER'


export function addAllDogs (dogs) {
    return {
        type: ADD_ALL_DOGS,
        payload: dogs
    }
}