import React, {useState} from 'react';
import Input from "./Input";
import shortid from "short-id"
import Button from "./Button";
import {useForm} from "react-hook-form";


const validationRule = { required: true, maxLength: 30};

const Form = ({columns, initialData, onAddData}) => {

    const [data, setData] = useState(initialData);
    const { register, errors, handleSubmit } = useForm();

    const handleClick = () => {
       // event.preventDefault();
        onAddData(data);
        setData(initialData);//clear form
    };

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const formData = {...data, id: shortid.generate()};
        formData[input.name] = input.value;
        setData(formData);
    };

    return (
        <form onSubmit={handleSubmit(handleClick)}>
            {columns.map(columnName => (
                    <Input
                        key={columnName}
                        name={columnName}
                        label={columnName}
                        value={data[columnName]}
                        type="input"
                        onChange={handleChange}
                        refer={register(validationRule)}
                        error={errors[columnName]}
                        errorInfo={`${columnName} field is required. Max length: ${validationRule.maxLength}`}
                    />
            ))}
            <Button
                type="submit"
                label="Save"
                classes="btn btn-primary"
            />
        </form>
    );
};

export default Form;
