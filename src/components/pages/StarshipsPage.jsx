import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Table from "../common/Table";
import Title from "../common/Title";
import Button from "../common/Button";
import {Orbitals} from "react-spinners-css";
import {getStarships} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import {getAllStarships} from "../../store/selectors/starships";
import {changeBelovedStatusStarship, deleteStarship, setStarships} from "../../store/actions/starships";


function StarshipsPage({isLoading, setIsLoading, storageKey}) {

    const dispatch = useDispatch();
    const starships = useSelector(state => getAllStarships(state));

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getStarships();
            dispatch(setStarships(data));
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            dispatch(setStarships(storedData));
        }
    }, []);

    useEffect(() => {
        saveToLS(storageKey, starships);
    }, [starships]);

    const handleDeleteStarship = (id) => {
        dispatch(deleteStarship(id));
    };

    const handleBelovedStatus = (id) => {
        dispatch(changeBelovedStatusStarship(id));
    };

    const getColumnNames = () => {
        if (!starships.length) {
            return []
        }

        const keys = Object.keys(starships[0]);
        // keys.pop();
        return keys.map(colName => {
            if (colName === 'name') {
                return {
                    colName,
                    content: ({name, id}) => (
                        <Link style={{color: '#f0ad4e'}} to={`/starships/${id}`}>{name}</Link>
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
            <Title titleText="Starships from Starwars Universe"/>

            <Link to={"/starships/new"}>
                <Button
                    type="submit"
                    label="Create New"
                    classes="btn btn-warning mt-2 mb-2"
                />
            </Link>
            {
                isLoading
                    ? <Orbitals color="#eb3434" className="Loader"/>
                    : starships.length
                    ? <Table
                        data={starships}
                        columns={getColumnNames()}
                        tableDescriptor="Starships"
                        onDeleteData={handleDeleteStarship}
                    />
                    : <div style={{fontSize: 23}}><strong>There are no entries in the table :(</strong></div>
            }
        </div>
    );
}

export default StarshipsPage;