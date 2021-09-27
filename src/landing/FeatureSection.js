import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

class FeatureSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            features: [],
            response:""
        }
    }

    componentDidMount(){
        fetch(`http://localhost:8080/api/v1/users/${this.props.match.params.id}`,{
            method:"Get",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response =>{
            if(!response.ok){
                if(response.status == 404){
                    throw new Error("not found")
                }else{
                    throw new Error("internal error")
                }
            }
            return response.json()
        }).then(response =>{
            this.setState({
                features:response.result.landings.features
            })
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
                <h1>Headers</h1>
                <h1>Features</h1>

                <div>
                    {this.state.features.map((item) =>{
                        return(
                            <div key={item.id}>
                                <i className={item.iconUrl} alt={item.description}></i>
                                <p>{item.title}</p>
                                &nbsp;
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default withRouter(FeatureSection);