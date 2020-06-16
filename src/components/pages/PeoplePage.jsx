import React, {useState} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";

const data = [
    {first: 'Mark', last: 'Otto', handle: '@motto', id: '1'},
    {first: 'Carl', last: 'Reno', handle: '@ceno', id: '2'},
    {first: 'Steve', last: 'Smith', handle: '@ssteve', id: '3'}
];

const columns = Object.keys(data[0]);

function PeoplePage() {

    const [people, setPeople] = useState(data);

    const handleDeletePerson = (id) => {
        const filteredData = people.filter(item => item.id !== id);
        setPeople(filteredData);
    };

    const handleAddPerson = (personData) => {
        const data = [...people, personData];
        setPeople(data);
    };

    const getInitialPeopleData = () => {
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="People from Starwars Universe"/>
            {
                people.length
                    ? <Table
                        data={people}
                        columns={columns}
                        tableDescriptor="People"
                        onDeleteData={handleDeletePerson}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Form
                initialData={getInitialPeopleData()}
                columns={columns}
                onAddData={handleAddPerson}
            />
        </div>
    );
}

export default PeoplePage;