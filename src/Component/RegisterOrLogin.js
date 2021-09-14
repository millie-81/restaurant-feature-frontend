import React, {Component} from 'react';
import {Link} from "react-router-dom";

class RegisterOrLogin extends Component {
    render() {
        return (
            <div>
                <Link to="/login">
                    <button>login</button>
                </Link>

                <Link to="/register">
                    <button>register</button>
                </Link>
            </div>

        );
    }
}

export default RegisterOrLogin;