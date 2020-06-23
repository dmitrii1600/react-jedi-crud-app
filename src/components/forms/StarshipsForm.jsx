import React, {useEffect, useState} from 'react';
import shortid from "short-id"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Button from "../common/Button";
import Input from "../common/Input";
import {starshipsColumns} from "../../services/swApiService";
import {saveToLS} from "../../services/localStorageService";
import {getAllStarships} from "../../store/selectors/starships";
import {addStarship, updateStarship} from "../../store/actions/starships";


const validationRuleDefault = {required: true, maxLength: 50};

const initialStarshipsData = starshipsColumns.reduce((cols, columnName) => {
    cols[columnName] = "";
    return cols;
}, {});


const StarshipsForm = ({history, match, storageKey}) => {

    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));

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

    useEffect(() => {
        saveToLS(storageKey, starships);
    }, [starships]);

    const onSubmit = () => {

        if (editMode) {
            dispatch(updateStarship(data))
        } else {
            const newStarship = {...data, beloved: false, id: shortid.generate()};
            dispatch(addStarship(newStarship));
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
                    columnName !== 'beloved' && <Input
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
                    classes="btn btn-success"
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

export default StarshipsForm;
