import React, {useEffect} from 'react';
import Table from "../common/Table";
import Title from "../common/Title";
import {getPlanets} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import {Link} from "react-router-dom";
import {Orbitals} from "react-spinners-css";


function PlanetsPage({planets, setPlanets, isLoading, setIsLoading, storageKey}) {

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPlanets();
            setPlanets(data);
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            setPlanets(storedData);
        }
    }, []);

    useEffect(() => {
        saveToLS(storageKey, planets);
    }, [planets]);

    const handleDeletePlanet = (id) => {
        const filteredData = planets.filter(item => item.id !== id);
        setPlanets(filteredData);
    };

    const getColumnNames = () => {
        if (!planets.length) {
            return []
        }

        const keys = Object.keys(planets[0]);
        //keys.pop();
        return keys.map(colName => {
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#f0ad4e'}} to={`/planets/${id}`}>{name}</Link>
                    )
                }
            }
            return {colName}
        })
    };

    return (
        <div className="container pt-2 pb-2">
            <Title titleText="Planets from Starwars Universe"/>
            <Link to={"/planets/new"}>
                <Button
                    type="submit"
                    label="Create New"
                    classes="btn btn-warning mt-2 mb-2"
                />
            </Link>
            {
                isLoading
                    ? <Orbitals color="#eb3434" className="Loader"/>
                    : planets.length
                    ? <Table
                        data={planets}
                        columns={getColumnNames()}
                        tableDescriptor="Planets"
                        onDeleteData={handleDeletePlanet}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table :(</strong></div>
            }
        </div>
    );
}

export default PlanetsPage;