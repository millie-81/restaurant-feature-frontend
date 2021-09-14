import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Manage extends Component {
    render() {
        return (
            <div>
                <Link to={"/profile"}>
                   <button>profile</button>
                </Link>

                {/*<Link to={"/features"}>*/}
                {/*    <button>features</button>*/}
                {/*</Link>*/}
            </div>
        );
    }
}

export default withRouter(Manage);