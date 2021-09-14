import React from 'react';
import logo from './logo.svg';
import './App.css';
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



const FAKE_DATA = {
    headSection: {
        title: 'Welcome to J',
        description: 'Mobile Template',
        backgroundURL: 'www.google.com/test.png'
    },
    featureSection: [
        {
            title: 'Free Wife',
            iconUrl: '',
        },
        {
            title: 'Free Wife',
            iconUrl: '',
        }
    ],
    menuSection: [
        {
            title: 'Delicious thick noodles',
            price: 12,
            backgroundURL: ''
        },
        {
            title: 'Delicious thick noodles',
            price: 45,
            backgroundURL: ''
        },
        {
            title: 'Delicious thick noodles',
            price: 12,
            backgroundURL: ''
        }
    ]
};

export class App extends React.Component {
    render() {
        return (

            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/RegisterOrLogin">RegisterOrLogin</Link>
                            </li>

                        </ul>
                    </nav>

                    {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
                    <Switch>
                        <Route path="/RegisterOrLogin" exact={true}>
                            <RegisterOrLogin />
                        </Route>
                        <Route path="/register" exact={true}>
                            <Register />
                        </Route>
                        <Route path="/login" exact={true}>
                            <Login />
                        </Route>
                        <Route path="/profile" exact={true}>
                            <Profile />
                        </Route>
                        <Route path="/manage" exact={true}>
                            <Manage />
                        </Route>
                        <Route path="/features" exact={true}>
                            <FeatureSectionEdit />
                        </Route>

                        {/*<Route path="/landings/me/features/add" exact={true}>*/}
                        {/*    <Login />*/}
                        {/*</Route>*/}
                        {/*<Route path="/landings/me/features/id/edit" exact={true}>*/}
                        {/*    <Login />*/}
                        {/*</Route>*/}
                    </Switch>
                </div>
            </Router>
        )
    }
}


