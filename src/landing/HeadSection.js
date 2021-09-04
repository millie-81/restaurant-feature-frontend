import React, {Component} from 'react';

class HeadSection extends Component {
    render() {
        let {data} = this.props;

        return (
            <div>
                <div className="content">
                    <img src={} alt=""/>
                    <div className="caption">
                        <h2>{}</h2>
                        <p>{}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeadSection;
