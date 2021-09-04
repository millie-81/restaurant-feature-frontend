import React, {Component} from 'react';
import {FAKE_DATA} from "../fakeData";

class Landing extends Component {
    state = {
        landingData: null
    };

    componentDidMount() {
        // todo: fetch landing by id
        // [GET] /landings/:id
        // fetch ()
        // this.setState({landingData: ??});
    }

    render() {
        // let landingData = this.state.landingData;
        let {landingData} = this.state;
        if (!landingData) {
            return <p>no landing data..</p>
        }
        return (
            <div className="landing_page">
                <header>header</header>
                <section>hero</section>
                <section>features</section>
                <section>menu</section>
            </div>
        );
    }
}

export default Landing;
