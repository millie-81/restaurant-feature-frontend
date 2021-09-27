import React, {Component} from 'react';
import {isEmpty} from "../util/helper";
import { Route , withRouter} from 'react-router-dom'

const Position = {
    textAlign:"center",
    width:"100%"
}

const Input = {
    width:"100%",
    borderRadius:"4px",
    border:"1px solid"
}

const initFormData = {
    formData:{
        username:"",
        password:"",
        confirmPassword:""
    },
    errors:{
        username:"",
        password:"",
        confirmPassword:""
    },
    response:""
}

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initFormData
        }
    }
    // manage input data
    handleInputChange = (event) =>{
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
           formData:{
               ...this.state.formData,
               [name]:value
           }
        })
    }

    //manageSubmit
    handleSubmit = (event) =>{
        event.preventDefault();
        let errors = this.errorValidate();
        if(isEmpty(errors)){
            fetch("http://localhost:8080/api/v1/auth/register",{
                method:"Post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(this.state.formData)
            }).then(response =>{
                if(!response.ok){
                    if(response.status == 401){
                        throw new Error("password should be same with confirm password")
                    }
                    if(response.status == 409){
                        throw new Error("the user is already taken.")
                    }
                    else{
                        throw new Error("some internal error")
                    }
                }
                return response.json()
            }).then(response =>{
                alert("create account successfully");
                this.props.history.push("/login")
                this.setState({
                    ...initFormData,
                })
            }).catch((error) =>{
                this.setState({
                    ...initFormData,
                    response: error.message
                })
            })


        }else{
            this.setState({
                errors:errors
            })
        }

    }

    errorValidate = () =>{
        let errors = {}
        if(this.state.formData.username == ""){
            errors.username = "username is required"
        }
        if(this.state.formData.password == ""){
            errors.password = "password is required"
        }
        if(this.state.formData.confirmPassword == ""){
            errors.confirmPassword = "confirm password is required"
        }
        return errors
    }

    render() {
        return (
            <div className={"bg-image"}>
                <form class={"form"} style={Position} onSubmit={this.handleSubmit}>
                    <h2>registration</h2>
                    {this.state.response.length > 0 &&<div className={"alert alert-danger"}>{this.state.response}</div>}
                    <div>
                        <label className={"label"}>username</label>
                        <input  style={Input} name={"username"} value={this.state.formData.username} type={"text"} onChange={this.handleInputChange}/>
                        <div className={"text-danger"}>{this.state.errors.username}</div>
                    </div>
                    <div>
                        <label className={"label"}>password</label>
                        <input style={Input} name={"password"} value={this.state.formData.password} type={"password"} onChange={this.handleInputChange}/>
                        <div className={"text-danger"}>{this.state.errors.password}</div>
                    </div>
                    <div>
                        <label className={"label"}>confirm password</label>
                        <input style={Input} name={"confirmPassword"} value={this.state.formData.confirmPassword} type={"password"} onChange={this.handleInputChange}/>
                        <div className={"text-danger"}>{this.state.errors.confirmPassword}</div>
                    </div>
                    <br/>
                    <button type={"submit"}>register</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);