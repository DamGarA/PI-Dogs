export const ADD_ALL_DOGS = 'ADD_CHARACTER'
export const ADD_TEMPERAMENTS = 'ADD_TEMPERAMENTS'
export const ORIGINAL_DOGS = "ORIGINAL_DOGS"


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

export function originalDogs (dogs) {
    return {
        type: ORIGINAL_DOGS,
        payload: dogs
    }
}