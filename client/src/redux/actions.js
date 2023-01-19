export const ADD_ALL_DOGS = 'ADD_CHARACTER'
export const ADD_TEMPERAMENTS = 'ADD_TEMPERAMENTS'


export function addAllDogs (dogs) {
    return {
        type: ADD_ALL_DOGS,
        payload: dogs
    }
}

export function addTemperaments (temperaments) {
    return {
        type: ADD_TEMPERAMENTS,
        payload: temperaments
    }
}