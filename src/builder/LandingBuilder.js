import React, {Component} from 'react';
import HeadSectionEdit from "./HeadSectionEdit";
import {FAKE_DATA} from "../fakeData";

export class LandingBuilder extends Component {
    state = {
        landingData: null
    };

    componentDidMount() {
        // todo: fetch landing by id
        // [GET] /landings/:id
        // fetch ()
    }

    render() {
        let {landingData} = this.state;
        if (!landingData) {
            return <p>no landing data..</p>
        }
        return (
            <div>
                {/*<HeadSectionEdit data={?}/>*/}
                {/*  Feature section edit component  */}
                {/*  Menu section edit component  */}
            </div>
        );
    }
}
