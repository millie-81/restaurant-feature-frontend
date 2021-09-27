import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";



const loginButtonStyle = {
    color:"red",
    fontsize:"14px",
    right:"8px",
    top:"16px",
    position:"fixed",
    width:"70px"
};


const registerButtonStyle = {
    color:"red",
    fontsize:"14px",
    right:"100px",
    top:"16px",
    position:"fixed",
    width:"70px"
};

const searchBar = {
    fontsize:"14px",
    top:"16px",
    position:"fixed",
    textAlign:"center",
    width:"80%",
    left:"80px"
};
class RegisterOrLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:""
        }
    }

    handleInputChange = (event) =>{
        const {name,value} = event.target
        this.setState({
           [name]:value
        })
    }

    handleSubmit = () =>{
        this.props.history.push(`/displayPage/${this.state.id}`)
    }

    render() {


        return (

            <div className={"bg-image"}>
                <Link to="/login">
                   <button style={loginButtonStyle}>login</button>
                </Link>

                <Link to="/register">
                    <button style={registerButtonStyle}>register</button>
                </Link>

                <form style={searchBar} onSubmit={this.handleSubmit}>
                    <input name={"id"} value={this.state.id} onChange={this.handleInputChange} />
                    <button type={"submit"}>search</button>
                </form>
            </div>

        );
    }
}

export default withRouter(RegisterOrLogin);