import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {peopleColumns} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import Input from "../common/Input";

const validationRuleDefault = {required: true, maxLength: 50};

const initialPeopleData = peopleColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const PeopleForm = ({people, setPeople, history, match, storageKey}) => {

    const [data, setData] = useState({...initialPeopleData});
    const [editMode, setEditMode] = useState(false);
    const {register, errors, handleSubmit} = useForm();


    useEffect(() => {
        const personId = match.params.id;
        if (personId === "new") return;
        const selectedPersonData = people.find(person => person.id === personId);
        setData(selectedPersonData);
        setEditMode(true);
    }, []);

    const onSubmit = () => {

        if (editMode) {
            const editedPeople = people.map(person => person.id === data.id ? data : person);
            saveToLS(storageKey, editedPeople);
            const storedData = getFromLS(storageKey);
            setPeople(storedData);
        } else {
            const newPeople = [...people, {...data, id: shortid.generate()}];
            saveToLS(storageKey, newPeople);
            const storedData = getFromLS(storageKey);
            setPeople(storedData);
            setData({...initialPeopleData});//clear form
        }
        history.push('/people');
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
                {peopleColumns.map(columnName => (
                    <Input
                        key={columnName}
                        name={columnName}
                        label={columnName}
                        value={data[columnName]}
                        type="input"
                        onChange={handleChange}
                        refer={columnName === 'mass' || columnName === 'height' ? register({
                            ...validationRuleDefault,
                            pattern: /^[0-9]*$/
                        }) : register(validationRuleDefault)}
                        error={errors[columnName]}
                        errorInfo={`Field is required. Max length: ${validationRuleDefault.maxLength}. ${columnName === 'mass' || columnName === 'height' ? 'Must be number.' : ''}`}
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
                    onClick={() => history.push('/people')}
                />
            </form>
        </div>
    );
};

export default PeopleForm;
