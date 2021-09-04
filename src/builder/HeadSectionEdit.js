import React, {Component} from 'react';

class HeadSectionEdit extends Component {
    state = {
        formData: {
            title: '',
            description: '',
            backgroundURL: ''
        }
    };

    componentDidMount() {
        let {data} = this.props;
        this.initializeFormVal(data);
    }

    initializeFormVal(data) {
        this.setState({formData: data});
    }

    inputChangeHandler = (event) => {
        event.preventDefault();
        let target = event.target;

        this.setState({
            formData: {...this.state.formData, [target.name]: target.value}
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        let {formData} = this.state;
        console.log(formData);
        // todo: fetch( )
    };

    render() {
        let {formData} = this.state;
        return (
            <div className="container">
                <h1>Head Section Title</h1>
                <div className={'form'}>
                    <form onSubmit={this.onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" name='title' onChange={this.inputChangeHandler}
                                   id="title" placeholder="Input title" value={formData.title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" name='description' onChange={this.inputChangeHandler}
                                   id="description" placeholder="Input Description" value={formData.description}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="background">Background Image</label>
                            <input type="text" className="form-control" name='backgroundURL' onChange={this.inputChangeHandler}
                                   id="background" placeholder="Example input" value={formData.backgroundURL}/>
                        </div>
                        <button className={'btn btn-primary'} type={'submit'}>Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default HeadSectionEdit;
