import React, {useEffect, useState} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import Form from "../common/Form";
import {getPlanets, getStarships} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";


function StarshipsPage() {
    const storageKey = 'starships';
    const [starships, setStarships] = useState(getFromLS(storageKey) || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPlanets();
            console.log("SERVERCALL");
            console.log(data);
            saveToLS(storageKey, data);
            const storedData = getFromLS(storageKey);
            setStarships(storedData);
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            console.log("INNN");
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
           // setIsLoading(true);
            getData();
          //  setIsLoading(false);
        } else {
            const storedData = getFromLS(storageKey);
            console.log("LS");
            setStarships(storedData);
        }
    }, []);

    const handleDeleteStarship = (id) => {
        const filteredData = starships.filter(item => item.id !== id);
        saveToLS(storageKey, filteredData);
        const storedData = getFromLS(storageKey);
        setStarships(storedData);
    };

    const handleAddStarship = (starshipData) => {
        const data = [...starships, starshipData];
        saveToLS(storageKey, data);
        const storedData = getFromLS(storageKey);
        setStarships(storedData);
    };

    const getInitialStarshipsData = () => {
        const columns = getColumnNames();
        return columns.reduce((cols, columnName) => {
            cols[columnName] = "";
            return cols;
        }, {})
    };

    const getColumnNames = () => {
        if (!starships.length) {
            return []
        }

        return Object.keys(starships[0])
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="Starships from Starwars Universe"/>
            {
                isLoading
                    ? <div style={{fontSize: 23}}><strong>Loading...</strong></div>
                    : starships.length
                        ? <Table
                            data={starships}
                            columns={getColumnNames()}
                            tableDescriptor="Starships"
                            onDeleteData={handleDeleteStarship}
                        />
                        : <div style={{fontSize: 23}}><strong>There are no entries in the table</strong></div>
            }
            <Form
                initialData={getInitialStarshipsData()}
                columns={getColumnNames()}
                onAddData={handleAddStarship}
            />
        </div>
    );
}

export default StarshipsPage;