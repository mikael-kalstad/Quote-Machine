import React from 'react';
import List from '../List';

function StartMenu(props) {
    let titleStyle = {
        fontSize: 40,
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    return (
        <div>
            <h1 style={titleStyle}>Quotes</h1>
            <List onClick={props.onClick} items={props.items} />
        </div>
    )
}

export default StartMenu;