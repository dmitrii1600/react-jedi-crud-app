import {
    ADD_STARSHIP,
    CHANGE_BELOVED_STATUS_STARSHIP,
    DELETE_STARSHIP,
    SET_STARSHIPS,
    UPDATE_STARSHIP
} from "../actions/starships";


const initialState = {
    allStarships: []
};

function starships(state = initialState, action) {
    switch (action.type) {
        case SET_STARSHIPS:
            return {
                ...state,
                allStarships: action.starships
            };
        case DELETE_STARSHIP:
            return {
                ...state,
                allStarships: state.allStarships.filter(starship => starship.id !== action.id)
            };
        case ADD_STARSHIP:
            return {
                ...state,
                allStarships: [...state.allStarships, action.newStarship]
            };
        case UPDATE_STARSHIP:
            return {
                ...state,
                allStarships: state.allStarships.map((starship) => {
                    return starship.id === action.newData.id ? action.newData : starship
                })
            };
        case CHANGE_BELOVED_STATUS_STARSHIP:
            return {
                ...state,
                allStarships: state.allStarships.map((starship) => {
                    return starship.id === action.id ? {...starship, beloved: !starship.beloved} : starship
                })
            };

        default:
            return state;
    }
}

export default starships;