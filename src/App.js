import React from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components"
import HeadSectionEdit from "./builder/HeadSectionEdit";
import Landing from "./landing/Landing";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import RegisterOrLogin from "./Component/RegisterOrLogin";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
import Manage from "./Component/manage";
import FeatureSectionEdit from "./builder/FeatureSectionEdit";
import UpdateFeature from "./builder/UpdateFeature";
import CreateFeature from "./builder/CreateFeature";
import FeatureSection from "./landing/FeatureSection";

export class App extends React.Component {
    render() {
        return (

            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">home</Link>
                            </li>

                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/register" exact={true}>
                            <Register />
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login />
                        </Route>
                        <Route path="/manage/:username" exact={true}>
                            <Manage />
                        </Route>
                        <Route path="/profile" exact={true}>
                            <Profile />
                        </Route>
                        <Route path="/features" exact={true}>
                            <FeatureSectionEdit />
                        </Route>
                        <Route path="/updateFeature/:id" exact={true}>
                            <UpdateFeature />
                        </Route>
                        <Route path="/createFeature" exact={true}>
                            <CreateFeature />
                        </Route>
                        <Route path="/displayPage/:id" exact={true}>
                            <FeatureSection />
                        </Route>
                        <Route path="/" exact={true}>
                            <RegisterOrLogin />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}


