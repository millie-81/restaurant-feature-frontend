import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Row} from "react-bootstrap";

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
        const blockColor = {
            backgroundColor:"lightslategray",
            width:"20%",
            display:"inline-block",
            marginLeft:"20px"
        }
        return (
            <div className={"bg-image"}>
                <div className={"homeStyle"}>
                    <Link to={"/"}>
                        <button>home</button>
                    </Link>
                </div>
                <br />
                <br />
                <div>
                    {this.state.response.length > 0 && <div className={"alert alert-danger"}>{this.state.response}</div>}
                    <h1>Headers</h1>
                    <hr />
                    <div>
                        {this.state.features.map((item) =>{
                            return(
                                <p style={blockColor} key={item.id}>
                                    <p style={{textAlign:"center"}}>
                                        <i className={item.iconUrl} alt={item.description}></i>
                                        <br/>
                                        <p>{item.title}</p>
                                    </p>
                                </p>

                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(FeatureSection);