import React, {Component} from 'react';
import {isEmpty} from "../util/helper";
import { Route , withRouter} from 'react-router-dom'

const Input = {
    width:"100%",
    borderRadius:"4px",
    border:"1px solid"
}

const Position = {
    textAlign:"center",
    width:"100%"
}

const initFormData = {
    formData:{
        username:"",
        password:""
    },
    errors:{
        username:"",
        password:""
    },
    response:""
}
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initFormData
        }
    }

    //manage input change
    handleInputChange = (event) =>{
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    }

    //handle submit
    handleSubmit = (event) =>{
        event.preventDefault();
        let errors = this.errorValidate()
        if(isEmpty(errors)){
            fetch("http://localhost:8080/api/v1/auth/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(this.state.formData)
            }).then(response =>{
                console.log(response)
                if(!response.ok){
                    if(response.status == 401){
                        throw new Error("the username and password not match")
                    }else{
                        throw new Error("there are some internal errors")
                    }
                }
                return response.json()
            }).then(response =>{
                localStorage.setItem("token",response.result)
                this.props.history.push(`/manage/${this.state.formData.username}`)
            }).catch((error) =>{
                this.setState({
                    ...initFormData,
                    response: error.message
                })
            })
        }
        else{
            this.setState({
                errors:errors
            })
        }
    }

    //error validate
    errorValidate = () =>{
        let errors = {}
        if(this.state.formData.username == ""){
            errors.username = "the username cannot be empty"
        }
        if(this.state.formData.password == ""){
            errors.password = "the password cannot be empty"
        }
        return errors
    }

    render() {
        return (
            <div className={"bg-image"}>
                <form onSubmit={this.handleSubmit} style={Position}>
                    <h2>Login</h2>
                    {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                    <div>
                        <label className={"label"}>username</label>
                        <input style={Input} name={"username"} type={"text"}  value={this.state.formData.username} onChange={this.handleInputChange}/>
                        <div className={"text-danger"}>{this.state.errors.username}</div>
                    </div>
                    <div>
                        <label className={"label"}>password</label>
                        <input style={Input} name={"password"} type={"password"}  value={this.state.formData.password} onChange={this.handleInputChange}/>
                        <div className={"text-danger"}>{this.state.errors.password}</div>
                    </div>
                    <br />
                    <button className={"button"}  type={"submit"}>login</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);