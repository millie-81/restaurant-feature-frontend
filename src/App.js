import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeadSectionEdit from "./builder/HeadSectionEdit";
import Landing from "./landing/Landing";
import {LandingBuilder} from "./builder/LandingBuilder";

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
            <>
                React APP
                {/*<LandingBuilder/>*/}
                {/*<landing/>*/}
            </>
        );
    }
}

