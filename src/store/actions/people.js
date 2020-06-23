export const SET_PEOPLE = 'SET_PEOPLE';
export const DELETE_PERSON = 'DELETE_PERSON';
export const ADD_PERSON = 'ADD_PERSON';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const CHANGE_BELOVED_STATUS_PERSON = 'CHANGE_BELOVED_STATUS_PERSON';

export function setPeople(people) {
    return {type: SET_PEOPLE, people}
}

export function deletePerson(id) {
    return {type: DELETE_PERSON, id}
}

export function addPerson(newPerson) {
    return {type: ADD_PERSON, newPerson}
}

export function updatePerson(newData) {
    return {type: UPDATE_PERSON, newData}
}

export function changeBelovedStatusPerson(id) {
    return {type: CHANGE_BELOVED_STATUS_PERSON, id};
}
