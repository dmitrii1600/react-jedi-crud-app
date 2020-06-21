import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import Table from "../common/Table";
import Title from "../common/Title";
import {getPeople} from "../../services/swApiService";
import {getFromLS, saveToLS} from "../../services/localStorageService";
import Button from "../common/Button";
import {Orbitals} from "react-spinners-css";
import {useDispatch, useSelector} from "react-redux";
import {getAllPeople} from "../../store/selectors/people";
import {deletePerson, setPeople} from "../../store/actions/people";


function PeoplePage({isLoading, setIsLoading, storageKey}) {
    const dispatch = useDispatch();
    const people = useSelector(state => getAllPeople(state));

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const data = await getPeople();
            saveToLS(storageKey, data);
            const storedData = getFromLS(storageKey);
            //setPeople(storedData);
            dispatch(setPeople(storedData));
            setIsLoading(false);
        };

        if (!localStorage.getItem(storageKey)) {
            saveToLS(storageKey, []);
        }

        if (!getFromLS(storageKey).length) {
            getData();
        } else {
            const storedData = getFromLS(storageKey);
            //setPeople(storedData);
            dispatch(setPeople(storedData));
            dispatch(deletePerson("111111"));
        }
    }, []);

    const handleDeletePerson = (id) => {
        console.log(id);
        //const filteredData = people.filter(item => item.id !== id);
        dispatch(deletePerson(id));
        //dispatch(setPeople(people));
        console.log("PEOPLE", people);

        saveToLS(storageKey, people);
        const storedData = getFromLS(storageKey);
        console.log("LSPEOPLE", storedData);
        //setPeople(storedData);
       // dispatch(setPeople(storedData));
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