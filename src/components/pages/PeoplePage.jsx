import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Table from "../common/Table";
import Title from "../common/Title";
import {getPeople} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import {Orbitals} from "react-spinners-css";


function PeoplePage({people, setPeople, isLoading, setIsLoading, storageKey}) {

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPeople();
            saveToLS(storageKey, data);
            const storedData = getFromLS(storageKey);
            setPeople(storedData);
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            setPeople(storedData);
        }
    }, []);

    const handleDeletePerson = (id) => {
        const filteredData = people.filter(item => item.id !== id);
        saveToLS(storageKey, filteredData);
        const storedData = getFromLS(storageKey);
        setPeople(storedData);
    };

    const getColumnNames = () => {
        if (!people.length) {
            return []
        }

        const keys = Object.keys(people[0]);
        //keys.pop(); // without id
        return keys.map(colName => {
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#f0ad4e'}} to={`/people/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
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
                    ? <Orbitals color="#eb3434" className="Loader"/>
                    : people.length
                    ? <Table
                        data={people}
                        columns={getColumnNames()}
                        tableDescriptor="People"
                        onDeleteData={handleDeletePerson}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table :(</strong></div>
            }
        </div>
    );
}

export default PeoplePage;