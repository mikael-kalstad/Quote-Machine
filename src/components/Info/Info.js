import React from 'react';
import Icon from '../Icon';
import InfoBox from './InfoBox';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: false
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        this.setState({ visibility: !this.state.visibility });
    }

    render() {
        return (
            <div>
                {/* CHANGE TO ICON COMPONENT! */}
                <Icon 
                    id="info-button"
                    link="#"
                    classNameA="icon"
                    onChange={this.onChange}
                    classNameI="fas fa-info-circle"
                />

                <InfoBox 
                    onClick={this.onChange}
                    visibility={this.state.visibility}
                    title="Info"
                    text="This is some information!"
                />
            </div>
        )
    }
}

export default Info;