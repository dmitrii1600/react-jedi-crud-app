import React from 'react';
import shortid from "short-id";
import Button from "./Button";

function Table({columns, data, tableDescriptor, onDeleteData}) {

    const generateKey = value => value + shortid.generate();

    const renderCell = (item, column) => column.content ?
        column?.content(item) : item[column.colName];

    return (
        <table className="table table-dark table-bordered table-responsive-md">
            <thead>
            <tr>
                <th scope="col">{tableDescriptor}</th>
                {columns.map(column => (
                    <th key={generateKey(column.colName)} scope="col">{column.colName}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={generateKey(item.name)}>
                    <th scope="row">{++index}</th>
                    {columns.map(column => (
                        <td key={generateKey(item.name)}>
                            {renderCell(item, column)}
                        </td>
                    ))}
                    <td>
                        <Button
                            label="Delete"
                            classes="btn btn-danger"
                            onClick={() => onDeleteData(item.id)}
                        />
                    </td>

                </tr>
            ))}

            </tbody>
        </table>
    )
}

export default Table;
