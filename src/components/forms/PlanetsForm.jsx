import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {planetsColumns} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import Input from "../common/Input";


const validationRuleDefault = {required: true, maxLength: 50};

const initialPlanetsData = planetsColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const PlanetsForm = ({planets, setPlanets, history, match, storageKey}) => {

    const [data, setData] = useState({...initialPlanetsData});
    const [editMode, setEditMode] = useState(false);
    const {register, errors, handleSubmit} = useForm();

    useEffect(() => {
        const planetId = match.params.id;
        if (planetId === "new") return;
        const selectedPlanetData = planets.find(planet => planet.id === planetId);
        setData(selectedPlanetData);
        setEditMode(true);
    }, []);

    const onSubmit = () => {

        if (editMode) {
            const editedPlanets = planets.map(person => person.id === data.id ? data : person);
            saveToLS(storageKey, editedPlanets);
            const storedData = getFromLS(storageKey);
            setPlanets(storedData);
        } else {
            const newPeople = [...planets, {...data, id: shortid.generate()}];
            saveToLS(storageKey, newPeople);
            const storedData = getFromLS(storageKey);
            setPlanets(storedData);
            setData({...initialPlanetsData});//clear form
        }
        history.push('/planets');
    };

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const formData = {...data};
        formData[input.name] = input.value;
        setData(formData);
    };

    return (
        <div className="container pt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                {planetsColumns.map(columnName => (
                    <Input
                        key={columnName}
                        name={columnName}
                        label={columnName}
                        value={data[columnName]}
                        type="input"
                        onChange={handleChange}
                        refer={columnName === 'diameter' || columnName === 'orbital_period' || columnName === 'rotation_period' ? register({
                            ...validationRuleDefault,
                            pattern: /^[0-9]*$/
                        }) : register(validationRuleDefault)}
                        error={errors[columnName]}
                        errorInfo={`Field is required. Max length: ${validationRuleDefault.maxLength}. ${columnName === 'diameter' || columnName === 'orbital_period' || columnName === 'rotation_period' ? 'Must be number.' : ''}`}
                    />
                ))}
                <Button
                    type="submit"
                    label="Save"
                    classes="btn btn-primary"
                />
                <Button
                    label="Back"
                    classes="btn btn-warning ml-2"
                    onClick={() => history.push('/planets')}
                />
            </form>
        </div>
    );
};

export default PlanetsForm;
