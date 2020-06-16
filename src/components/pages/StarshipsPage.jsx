import React, {useState} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";

const data = [
    {name: 'Azure Angel II', type: 'aethersprite-class', color: 'metal', id: '1'},
    {name: 'Death Star', type: 'battle station', color: 'white', id: '2'},
    {name: 'Ebon Hawk', type: 'fighter', color: 'black', id: '3'},
];

const columns = Object.keys(data[0]);

function StarshipsPage() {

    const [starships, setStarships] = useState(data);

    const handleDeleteStarship = (id) => {
        const filteredData = starships.filter(item => item.id !== id);
        setStarships(filteredData);
    };

    const handleAddStarship = (starshipData) => {
        const data = [...starships, starshipData];
        setStarships(data);
    };

    const getInitialStarshipsData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="Starships from Starwars Universe"/>
            {
                starships.length
                    ? <Table
                        data={starships}
                        columns={columns}
                        tableDescriptor="Starships"
                        onDeleteData={handleDeleteStarship}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Form
                initialData={getInitialStarshipsData()}
                columns={columns}
                onAddData={handleAddStarship}
            />
        </div>
    );
}

export default StarshipsPage;