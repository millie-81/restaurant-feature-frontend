import React, {Component} from 'react';
import {Link, Route, withRouter, BrowserRouter as Router, NavLink} from "react-router-dom";
import Profile from "./Profile";
import FeatureSectionEdit from "../builder/FeatureSectionEdit";
import {Dropdown,DropdownButton, Tab, Tabs} from 'react-bootstrap';
import DropdownItem from "react-bootstrap/DropdownItem";

const helloStyle ={
    textAlign:"center"
}

class Manage extends Component {
    render() {
        return (
            <div className={"bg-image"}>
                <h2 style={helloStyle} >hello,{this.props.match.params.username}</h2>
                <div className={"homeStyle"}>
                    <Link to={"/"}>
                        <button>home</button>
                    </Link>
                </div>
                <br />
                <Tabs
                    defaultActiveKey="profile"
                    transition={false}
                    className="mb-3"
                >
                    <Tab eventKey="profile" title="Profile">
                        <Profile />
                    </Tab>
                    <Tab eventKey="head" title="head">
                    </Tab>
                    <Tab eventKey="feature" title="feature">
                        <FeatureSectionEdit />
                    </Tab>
                    <Tab eventKey="menu" title="menu">
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Manage);