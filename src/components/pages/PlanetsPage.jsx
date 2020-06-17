import React, {useEffect, useState} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";
import {getPeople, getPlanets} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";


function PlanetsPage() {
    const storageKey = 'planets';
    const [planets, setPlanets] = useState(getFromLS(storageKey) || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPlanets();
            console.log("SERVERCALL");
            console.log(data);
            saveToLS(storageKey, data);
            const storedData = getFromLS(storageKey);
            setPlanets(storedData);
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            console.log("INNN");
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            console.log("LS");
            setPlanets(storedData);
        }
    }, []);

    const handleDeletePlanet = (id) => {
        const filteredData = planets.filter(item => item.id !== id);
        saveToLS(storageKey, filteredData);
        const storedData = getFromLS(storageKey);
        setPlanets(storedData);
    };

    const handleAddPlanet = (planetData) => {
        const data = [...planets, planetData];
        saveToLS(storageKey, data);
        const storedData = getFromLS(storageKey);
        setPlanets(storedData);
    };

    const getInitialPlanetsData = () => {
        const columns = getColumnNames();
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    const getColumnNames = () => {
        if (!planets.length) {
            return []
        }

        return Object.keys(planets[0])
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="Planets from Starwars Universe"/>
            {
                isLoading
                    ? <div style={{fontSize: 23}}><strong>Loading...</strong></div>
                    : planets.length
                        ? <Table
                            data={planets}
                            columns={getColumnNames()}
                            tableDescriptor="Planets"
                            onDeleteData={handleDeletePlanet}
                        />
                        : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Form
                initialData={getInitialPlanetsData()}
                columns={getColumnNames()}
                onAddData={handleAddPlanet}
            />
        </div>
    );
}

export default PlanetsPage;