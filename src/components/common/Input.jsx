import React from 'react';

const Input = ({name, label, error, errorInfo, refer, ...rest}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                {...rest}
                className="form-control"
                ref={refer}
            />
            {error && <div className="alert alert-danger mt-2"><strong>{errorInfo}</strong></div>}
        </div>
    );
};

export default Input;
