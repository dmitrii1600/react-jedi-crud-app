import shortid from "short-id"

export const peopleColumns = [
    'name',
    'height',
    'mass',
    'gender',
    'birth_year',
    'beloved',
];

export const planetsColumns = [
    'name',
    'diameter',
    'rotation_period',
    'orbital_period',
    'gravity',
    'beloved',
];

export const starshipsColumns = [
    'name',
    'model',
    'starship_class',
    'manufacturer',
    'beloved',
];

const url = 'https://swapi.dev/api';

export const getPeople = async () => {
    const peopleResponse = await (await fetch(`${url}/people`)).json();

    console.log(peopleResponse);
    return peopleResponse.results.map(({name, height, mass, gender, birth_year}) => ({
        name, height, mass, gender, birth_year, beloved: false, id: shortid.generate(),
    }));
};

export const getPlanets = async () => {
    const planetsResponse = await (await fetch(`${url}/planets`)).json();

    console.log(planetsResponse);
    return planetsResponse.results.map(({name, diameter, rotation_period, orbital_period, gravity}) => ({
        name, diameter, rotation_period, orbital_period, gravity, beloved: false, id: shortid.generate(),
    }));
};

export const getStarships = async () => {
    const starshipsResponse = await (await fetch(`${url}/starships`)).json();

    console.log(starshipsResponse);
    return starshipsResponse.results.map(({name, model, starship_class, manufacturer}) => ({
        name, model, starship_class, manufacturer, beloved: false, id: shortid.generate(),
    }));
};

