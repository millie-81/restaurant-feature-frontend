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
                this.props.history.push(`/features`)
            }).catch((error) =>{
                this.setState({
                    response:error.message
                })
            })
        }else{
            this.setState({
                errors:errors
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
        const Position = {
            textAlign:"center",
            width:"100%"
        }
        const Input = {
            width:"70%",
            borderRadius:"4px",
            border:"1px solid"
        }
        return (
            <div className={"bg-image"}>
                <form className={"form"} onSubmit={this.handleSubmit} style={Position}>
                    {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                    <div>
                        <label className={"label"}>iconUrl</label>
                        <br />
                        <input style={Input} name={"iconUrl"} value={this.state.features.iconUrl} type={"text"} onChange={this.handleInputChange} />
                        <div className={"text-danger"}>{this.state.errors.iconUrl}</div>
                    </div>
                    <div>
                        <label className={"label"}>description</label>
                        <br />
                        <input style={Input} name={"description"} value={this.state.features.description} type={"text"} onChange={this.handleInputChange} />
                        <div className={"text-danger"}>{this.state.errors.description}</div>
                    </div>
                    <div>
                        <label className={"label"}>title</label>
                        <br />
                        <input style={Input} name={"title"} value={this.state.features.title} type={"text"} onChange={this.handleInputChange} />
                        <div className={"text-danger"}>{this.state.errors.title}</div>
                    </div>
                    <br />

                    <button className={"button"} type={"submit"}>create</button>
                </form>
            </div>
        );
    }
}

export default withRouter(CreateFeature);