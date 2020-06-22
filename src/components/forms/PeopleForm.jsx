import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {peopleColumns} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import Input from "../common/Input";
import {useDispatch, useSelector} from "react-redux";
import {getAllPeople} from "../../store/selectors/people";
import {addPerson, setPeople, updatePerson} from "../../store/actions/people";

const validationRuleDefault = {required: true, maxLength: 50};

const initialPeopleData = peopleColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const PeopleForm = ({history, match, storageKey}) => {

    const dispatch = useDispatch();
    const people = useSelector(state => getAllPeople(state));

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

    useEffect(() => {
        saveToLS(storageKey, people);
    }, [people]);

    const onSubmit = () => {

        if (editMode) {
            //const editedPeople = people.map(person => person.id === data.id ? data : person);
            dispatch(updatePerson(data));
        } else {
            const newPerson = {...data, id: shortid.generate()};
            dispatch(addPerson(newPerson));
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
