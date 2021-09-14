import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile:{},
            response:""
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/v1/users/me",{
            method:"GET",
            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }).then(response =>{
            if(!response.ok){
                if(response.status == 401){
                    throw new Error("you are unauthorized")
                }
                if(response.status == 404){
                    throw new Error("not found")
                }
                else{
                    throw new Error("internal errors")
                }
            }
            return response.json()
        }).then(response =>{
            console.log(response.result.landingData)
            this.setState({
                profile:response.result
            })
        }).catch((error) =>{
            this.setState({
                response: error.message
            })
        })
    }

    handleInputChange = (event) =>{
        event.preventDefault();
        const{name, value} = event.target;
        this.setState({
            profile:{
               ...this.state.profile,
                [name]:value
            }
        })
    }

    handleSubmit = (e,id) =>{
        e.preventDefault()
        fetch("http://localhost:8080/api/v1/users/" + id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(this.state.profile)
        }).then((response) =>{
            if(!response.ok){
                if(response.status == 404){
                    throw new Error("the user not found")
                }
                else{
                    throw new Error("internal errors")
                }
            }
            return response.json()
        }).then((response) =>{
            alert("update successfully")
        }).catch((error) =>{
            this.setState({
                response: error.message
            })
            }
        )
    }




    render() {

        return (
            <div>
                <div>
                    <h2>Profile</h2>
                    {this.state.response.length > 0 &&<div className={"alert alert-danger"}>{this.state.response}</div> }
                    <form onSubmit={(e) =>{
                        e.preventDefault()
                        this.handleSubmit(e,this.state.profile.id)
                    }
                    }>
                        <div>
                            <label className={"label"}>id</label>
                            <input name={"id"} defaultValue={this.state.profile.id} />
                        </div>
                        <div>
                            <label className={"label"}>username</label>
                            <input name={"username"} defaultValue={this.state.profile.username} />
                        </div>
                        <div>
                            <label className={"label"}>email</label>
                            <input name={"email"} type={"email"} defaultValue={this.state.profile.email} onChange={this.handleInputChange}/>
                        </div>
                        <div>
                            <label className={"label"}>First Name</label>
                            <input name={"firstName"} defaultValue={this.state.profile.firstName} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label className={"label"}>Last Name</label>
                            <input name={"lastName"} defaultValue={this.state.profile.lastName} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label className={"label"}>address</label>
                            <input name={"address"} defaultValue={this.state.profile.address} onChange={this.handleInputChange} />
                        </div>
                        <button type={"submit"}>update the file</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);