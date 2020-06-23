export const SET_STARSHIPS = 'SET_STARSHIPS';
export const DELETE_STARSHIP = 'DELETE_STARSHIP';
export const ADD_STARSHIP = 'ADD_STARSHIP';
export const UPDATE_STARSHIP = 'UPDATE_STARSHIP';
export const CHANGE_BELOVED_STATUS_STARSHIP = 'CHANGE_BELOVED_STATUS_STARSHIP';

export function setStarships(starships) {
    return {type: SET_STARSHIPS, starships}
}

export function deleteStarship(id) {
    return {type: DELETE_STARSHIP, id}
}

export function addStarship(newStarship) {
    return {type: ADD_STARSHIP, newStarship}
}

export function updateStarship(newData) {
    return {type: UPDATE_STARSHIP, newData}
}

export function changeBelovedStatusStarship(id) {
    return {type: CHANGE_BELOVED_STATUS_STARSHIP, id};
}
