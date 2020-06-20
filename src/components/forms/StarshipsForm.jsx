import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {starshipsColumns} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import Input from "../common/Input";


const validationRuleDefault = {required: true, maxLength: 50};

const initialStarshipsData = starshipsColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const PeopleForm = ({starships, setStarships, history, match, storageKey}) => {

    const [data, setData] = useState({...initialStarshipsData});
    const [editMode, setEditMode] = useState(false);
    const {register, errors, handleSubmit} = useForm();

    useEffect(() => {
        const starshipId = match.params.id;
        if (starshipId === "new") return;
        const selectedStarshipsData = starships.find(starship => starship.id === starshipId);
        setData(selectedStarshipsData);
        setEditMode(true);
    }, []);

    const onSubmit = () => {

        if (editMode) {
            const editedStarships = starships.map(person => person.id === data.id ? data : person);
            saveToLS(storageKey, editedStarships);
            const storedData = getFromLS(storageKey);
            setStarships(storedData);
        } else {
            const newStarships = [...starships, {...data, id: shortid.generate()}];
            saveToLS(storageKey, newStarships);
            const storedData = getFromLS(storageKey);
            setStarships(storedData);
            setData({...initialStarshipsData});//clear form
        }
        history.push('/starships');
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
                {starshipsColumns.map(columnName => (
                    <Input
                        key={columnName}
                        name={columnName}
                        label={columnName}
                        value={data[columnName]}
                        type="input"
                        onChange={handleChange}
                        refer={register(validationRuleDefault)}
                        error={errors[columnName]}
                        errorInfo={`Field is required. Max length: ${validationRuleDefault.maxLength}`}
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
                    onClick={() => history.push('/starships')}
                />
            </form>
        </div>
    );
};

export default PeopleForm;
