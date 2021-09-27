import React, {Component} from 'react';
import {Link, Route, withRouter, BrowserRouter as Router, NavLink} from "react-router-dom";
import Profile from "./Profile";
import FeatureSectionEdit from "../builder/FeatureSectionEdit";
import { Tab, Tabs } from 'react-bootstrap';


class Manage extends Component {
    render() {
        return (
            <Router>
                <div className={"bg-image"}>
                    <h2>hello,{this.props.match.params.username}</h2>
                    <ul className={"header"}>
                        <li><Link to={"/profile"}>profile</Link></li>
                        <li><Link to={"/features"}>feature</Link></li>
                    </ul>
                    <div className={"content"}>
                        <Route path="/profile" exact={true}>
                            <Profile />
                        </Route>
                        <Route path="/features" exact={true}>
                            <FeatureSectionEdit />
                        </Route>
                    </div>
                </div>
            </Router>
            // <Tabs
            //     defaultActiveKey="profile"
            //     transition={false}
            //     className="mb-3"
            // >
            //     <Tab eventKey="profile" title="Profile">
            //         <Profile />
            //     </Tab>
            //     <Tab eventKey="feature" title="Feature">
            //         <FeatureSectionEdit />
            //     </Tab>
            // </Tabs>
        );
    }
}

export default withRouter(Manage);