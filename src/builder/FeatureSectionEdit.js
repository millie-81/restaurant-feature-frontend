import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import UpdateFeature from "./UpdateFeature";

class FeatureSectionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features:[],
            response:""
        }
    }
    // display the features of this landing directly
    componentDidMount() {
        fetch("http://localhost:8080/api/v1/landings/me/features",{
            method:"GET",
            headers:{
                "Authorization": localStorage.getItem("token")
            }
        }).then(response =>{
            if(!response.ok){
                if(response.status == 401){
                    throw new Error("not authorized")
                }else if(response.status == 404){
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

    handleDelete = (e,id) =>{
        e.preventDefault()
        fetch("http://localhost:8080/api/v1/landings/me/features/" + id,{
            method:"DELETE",
            headers:{
                "Authorization":localStorage.getItem("token")
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
            alert("delete successfully")
            window.location.reload()
        }).catch((error) =>{
            this.setState({
                response:error.message
            })
        })
    }





    render() {
        return (
            <div>
                {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                <h3>FEATURES</h3>
                <Link to={"/createFeature"}>
                    <button>Add features</button>
                </Link>
                <div>
                    {this.state.features.map((item) =>{
                        return(
                            <div key={item.id}>
                                <i className={item.iconUrl} alt={item.description}></i>
                                &nbsp;
                                <Link to={`/updateFeature/${item.id}`}>
                                    {item.title}
                                </Link>
                                &nbsp;
                                <button onClick={(e) =>{
                                    e.preventDefault()
                                    this.handleDelete(e,item.id)
                                }
                                }>
                                    delete
                                </button>
                            </div>
                        )
                    })}
                </div>

            </div>
        );
    }
};

export default withRouter(FeatureSectionEdit);