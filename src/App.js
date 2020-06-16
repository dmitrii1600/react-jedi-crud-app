import React from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import NotFound from "./components/pages/NotFound";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function App() {

    return (
        <Router>
            <div className="App">
                <Navbar classes="navbar fixed-top navbar-expand-sm navbar-dark bg-dark"/>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/people"/>
                    </Route>
                    <Route path="/people">
                        <PeoplePage/>
                    </Route>
                    <Route path="/planets">
                        <PlanetsPage/>
                    </Route>
                    <Route path="/starships">
                        <StarshipsPage/>
                    </Route>
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
