import React, {useState} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";

const data = [
    {name: 'Anaxes', galaxy: 'E-5465', type: 'rocky', id: '1'},
    {name: 'Abafar', galaxy: 'Z-23', type: 'desert', id: '2'},
    {name: 'Aeos Prime', galaxy: 'F-234', type: 'ocean', id: '3'},
];

const columns = Object.keys(data[0]);

function PlanetsPage() {

    const [planets, setPlanets] = useState(data);

    const handleDeletePlanet = (id) => {
        const filteredData = planets.filter(item => item.id !== id);
        setPlanets(filteredData);
    };

    const handleAddPlanet = (planetData) => {
        const data = [...planets, planetData];
        setPlanets(data);
    };

    const getInitialPlanetsData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="Planets from Starwars Universe"/>
            {
                planets.length
                    ? <Table
                        data={planets}
                        columns={columns}
                        tableDescriptor="Planets"
                        onDeleteData={handleDeletePlanet}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Form
                initialData={getInitialPlanetsData()}
                columns={columns}
                onAddData={handleAddPlanet}
            />
        </div>
    );
}

export default PlanetsPage;