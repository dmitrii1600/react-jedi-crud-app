import React, {useEffect, useState} from 'react';
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";
import {getPeople} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";


function PeoplePage() {
    const storageKey = 'people';

    const {path, url} = useRouteMatch();

    const [people, setPeople] = useState(getFromLS(storageKey) || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPeople();
            console.log("SERVERCALL");
            console.log(data);
            saveToLS(storageKey, data);
            const storedData = getFromLS(storageKey);
            setPeople(storedData);
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            console.log("INNN");
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length){
            getData();
        }
        else {
            const storedData = getFromLS(storageKey);
            console.log("LS");
            setPeople(storedData);
        }
    }, []);

    const handleDeletePerson = (id) => {
        const filteredData = people.filter(item => item.id !== id);
        saveToLS(storageKey, filteredData);
        const storedData = getFromLS(storageKey);
        setPeople(storedData);
    };

    const handleAddPerson = (personData) => {
        const data = [...people, personData];
        saveToLS(storageKey, data);
        const storedData = getFromLS(storageKey);
        setPeople(storedData);
    };

    const getInitialPeopleData = () => {
        const columns = getColumnNames();
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    const getColumnNames = () => {
        if (!people.length) {
            return []
        }

        const keys = Object.keys(people[0]);
        keys.pop();
        return keys
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="People from Starwars Universe"/>

            <Link to={"/people/new"}>
                <Button
                    type="submit"
                    label="Create New"
                    classes="btn btn-warning mt-2 mb-2"
                />
            </Link>
            {
                isLoading
                    ? <div style={{fontSize: 23}}><strong>Loading...</strong></div>
                    : people.length
                        ? <Table
                            data={people}
                            columns={getColumnNames()}
                            tableDescriptor="People"
                            onDeleteData={handleDeletePerson}
                        />
                        : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Switch>
                <Route exact path="/">

                </Route>
            </Switch>
            <Form
                initialData={getInitialPeopleData()}
                columns={getColumnNames()}
                onAddData={handleAddPerson}
            />
        </div>
    );
}

export default PeoplePage;