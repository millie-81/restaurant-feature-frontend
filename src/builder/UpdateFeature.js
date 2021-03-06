import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class UpdateFeature extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features:{},
            response:""
        }

    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/v1/landings/me/features/${this.props.match.params.id}`,{
            method:"GET",
            headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json"
            }
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
            this.setState({
                features:response.result
            })
        }).catch((error) =>{
            this.setState({
                response:error.message
            })
        })
    }
    // WHEN SUBMIT ALL DATA, USE FETCH TO UPDATE THE DATA
    handleSubmit = (e,id) =>{
        fetch(`http://localhost:8080/api/v1/landings/me/features/${id}`,{
            method:"PUT",
            headers:{
                "Authorization":localStorage.getItem("token"),
                "Content-Type":"application/json"
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
            alert("update successfully")
        }).catch((error) =>{
            this.setState({
                response: error.message
            })
        })
    }

    handleInputChange = (event) =>{
        const{name,value} = event.target;
        this.setState({
            features:{
                ...this.state.features,
                [name]: value
            }
        })
    }

    render() {
        return (
            <div className={"bg-image"}>
                {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                <form onSubmit={(e) =>{
                    e.preventDefault()
                    this.handleSubmit(e,this.props.match.params.id)
                }
                } style={{textAlign:"center"}}>
                    <div>
                        <label>iconUrl</label>
                        <br />
                        <input name={"iconUrl"} defaultValue={this.state.features.iconUrl} onChange={this.handleInputChange} />
                    </div>
                    <div>
                        <label>description</label>
                        <br />
                        <input name={"description"} defaultValue={this.state.features.description} onChange={this.handleInputChange}/>
                    </div>
                    <div>
                        <label>title</label>
                        <br />
                        <input name={"title"} defaultValue={this.state.features.title} onChange={this.handleInputChange}/>
                    </div>
                    <br />
                    <div>
                        <button className={"button"} type={"submit"}>update</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default withRouter(UpdateFeature);