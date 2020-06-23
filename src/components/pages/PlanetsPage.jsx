import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Table from "../common/Table";
import Title from "../common/Title";
import Button from "../common/Button";
import {Orbitals} from "react-spinners-css";
import {getPlanets} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import {getAllPlanets} from "../../store/selectors/planets";
import {changeBelovedStatusPlanet, deletePlanet, setPlanets} from "../../store/actions/planets";


function PlanetsPage({isLoading, setIsLoading, storageKey}) {

    const dispatch = useDispatch();
    const planets = useSelector(state => getAllPlanets(state));

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPlanets();
            dispatch(setPlanets(data));
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            dispatch(setPlanets(storedData));
        }
    }, []);

    useEffect(() => {
        saveToLS(storageKey, planets);
    }, [planets]);

    const handleDeletePlanet = (id) => {
        dispatch(deletePlanet(id));
    };

    const handleBelovedStatus = (id) => {
        dispatch(changeBelovedStatusPlanet(id));
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
            if (colName === 'beloved') {
                return {
                    colName,
                    content: ({beloved, id}) => (
                        <input
                            type="checkbox"
                            checked={beloved}
                            onChange={() => handleBelovedStatus(id)}
                        />
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