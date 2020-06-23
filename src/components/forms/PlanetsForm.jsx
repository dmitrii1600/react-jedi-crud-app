import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Button from "../common/Button";
import Input from "../common/Input";
import {planetsColumns} from "../../services/swApiService";
import {saveToLS} from "../../services/localStorageService";
import {getAllPlanets} from "../../store/selectors/planets";
import {addPlanet, updatePlanet} from "../../store/actions/planets";


const validationRuleDefault = {required: true, maxLength: 50};

const initialPlanetsData = planetsColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const PlanetsForm = ({history, match, storageKey}) => {

    const dispatch = useDispatch();
    const planets = useSelector(state => getAllPlanets(state));

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

    useEffect(() => {
        saveToLS(storageKey, planets);
    }, [planets]);

    const onSubmit = () => {

        if (editMode) {
            dispatch(updatePlanet(data));
        } else {
            const newPlanet = {...data, beloved: false, id: shortid.generate()};
            dispatch(addPlanet(newPlanet));
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
                    columnName !== 'beloved' && <Input
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
                    classes="btn btn-success"
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
