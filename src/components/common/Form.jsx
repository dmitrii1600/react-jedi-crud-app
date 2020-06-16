import React, {useState} from 'react';
import Input from "./Input";
import Button from "./Button";

const Form = ({columns, initialData, onAddData}) => {
    const [data, setData] = useState(initialData);

    const handleClick = (event) => {
        event.preventDefault();
        onAddData(data);
        setData(initialData);//clear form
    };

    const handleChange = (event) => {
        const {currentTarget: input} = event;
        const formData = {...data};
        formData[input.name] = input.value;
        setData(formData);
    };

    return (
        <form>
            {columns.map(columnName => (
                <Input
                    key={columnName}
                    name={columnName}
                    label={columnName}
                    value={data[columnName]}
                    type="input"
                    onChange={handleChange}
                />
            ))}
            <Button
                type="submit"
                label="Save"
                classes="btn btn-primary"
                onClick={handleClick}
            />
        </form>
    );
};

export default Form;
