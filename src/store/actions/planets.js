export const SET_PLANETS = 'SET_PLANETS';
export const DELETE_PLANET = 'DELETE_PLANET';
export const ADD_PLANET = 'ADD_PLANET';
export const UPDATE_PLANET = 'UPDATE_PLANET';
export const CHANGE_BELOVED_STATUS_PLANET = 'CHANGE_BELOVED_STATUS_PLANET';

export function setPlanets(planets) {
    return {type: SET_PLANETS, planets}
}

export function deletePlanet(id) {
    return {type: DELETE_PLANET, id}
}

export function addPlanet(newPlanet) {
    return {type: ADD_PLANET, newPlanet}
}

export function updatePlanet(newData) {
    return {type: UPDATE_PLANET, newData}
}

export function changeBelovedStatusPlanet(id) {
    return {type: CHANGE_BELOVED_STATUS_PLANET, id};
}
