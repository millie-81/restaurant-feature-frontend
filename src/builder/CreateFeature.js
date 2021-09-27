import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {isEmpty} from "../util/helper";

class CreateFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features:{
                iconUrl:"",
                title:"",
                description:""
            },
            errors:{
                iconUrl:"",
                title:"",
                description:""
            },
            response:""
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        let errors = this.handleValidateError()
        if(isEmpty(errors)){
            fetch("http://localhost:8080/api/v1/landings/me/features",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("token")
                },
                body:JSON.stringify(this.state.features)
            }).then(response =>{
                if(!response.ok){
                    if(response.status == 404){
                        throw new Error("not found")
                    }else{
                        throw new Error("internal errors")
                    }
                }
                return response.json()
            }).then(response =>{
                alert("create successfully")
                this.setState({
                    features:response.result
                })
            }).catch((error) =>{
                this.setState({
                    response:error.message
                })
            })
        }
    }

    handleInputChange = (event) =>{
        const{name, value} = event.target
        this.setState({
            features:{
                ...this.state.features,
                [name]: value
            }
        })
    }

    handleValidateError = () =>{
        let errors = {}
        if(this.state.features.iconUrl == ""){
            errors.iconUrl = "iconUrl cannot be empty"
        }

        if(this.state.features.description == ""){
            errors.description = "description cannot be empty"
        }

        if(this.state.features.title == ""){
            errors.title = "title cannot be empty"
        }

        return errors
    }

    render() {
        return (
            <div>
                {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                <form onSubmit={this.handleSubmit}>
                    <label>iconUrl</label>
                    <input name={"iconUrl"} value={this.state.features.iconUrl} onChange={this.handleInputChange} />
                    <div className={"text-danger"}>{this.state.errors.iconUrl}</div>
                    <label>description</label>
                    <input name={"description"} value={this.state.features.description} onChange={this.handleInputChange} />
                    <div className={"text-danger"}>{this.state.errors.description}</div>
                    <label>title</label>
                    <input name={"title"} value={this.state.features.title} onChange={this.handleInputChange} />
                    <div className={"text-danger"}>{this.state.errors.title}</div>
                    <button type={"submit"}>create</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateFeature);