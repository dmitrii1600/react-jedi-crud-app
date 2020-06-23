import {ADD_PLANET, CHANGE_BELOVED_STATUS_PLANET, DELETE_PLANET, SET_PLANETS, UPDATE_PLANET} from "../actions/planets";


const initialState = {
    allPlanets: []
};

function planets(state = initialState, action) {
    switch (action.type) {
        case SET_PLANETS:
            return {
                ...state,
                allPlanets: action.planets
            };
        case DELETE_PLANET:
            return {
                ...state,
                allPlanets: state.allPlanets.filter(planet => planet.id !== action.id)
            };
        case ADD_PLANET:
            return {
                ...state,
                allPlanets: [...state.allPlanets, action.newPlanet]
            };
        case UPDATE_PLANET:
            return {
                ...state,
                allPlanets: state.allPlanets.map((planet) => {
                    return planet.id === action.newData.id ? action.newData : planet
                })
            };
        case CHANGE_BELOVED_STATUS_PLANET:
            return {
                ...state,
                allPlanets: state.allPlanets.map((planet) => {
                    return planet.id === action.id ? {...planet, beloved: !planet.beloved} : planet
                })
            };

        default:
            return state;
    }
}

export default planets;