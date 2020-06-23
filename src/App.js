import React, {useState} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import NotFound from "./components/pages/NotFound";
import PeopleForm from "./components/forms/PeopleForm";
import PlanetsForm from "./components/forms/PlanetsForm";
import StarshipsForm from "./components/forms/StarshipsForm";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    const storageKeyPeople = 'people';
    const storageKeyPlanets = 'planets';
    const storageKeyStarships = 'starships';

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="App">
            <Navbar classes="navbar fixed-top navbar-expand-sm navbar-dark bg-dark"/>
            <Switch>
                <Route path="/people/:id" render={props =>
                    <PeopleForm {...props} storageKey={storageKeyPeople}/>}/>
                <Route exact path="/people" render={props =>
                    <PeoplePage {...props}
                                storageKey={storageKeyPeople}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}/>}/>
                <Route path="/planets/:id" render={props =>
                    <PlanetsForm {...props}
                                 storageKey={storageKeyPlanets}/>}/>
                <Route path="/planets" render={props =>
                    <PlanetsPage {...props}
                                 storageKey={storageKeyPlanets}
                                 isLoading={isLoading}
                                 setIsLoading={setIsLoading}/>}/>
                <Route path="/starships/:id" render={props =>
                    <StarshipsForm {...props}
                                   storageKey={storageKeyStarships}/>}/>
                <Route path="/starships" render={props =>
                    <StarshipsPage {...props}
                                   storageKey={storageKeyStarships}
                                   isLoading={isLoading}
                                   setIsLoading={setIsLoading}/>}/>
                <Route exact path="/">
                    <Redirect to="/people"/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
