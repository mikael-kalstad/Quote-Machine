import React from 'react';

function Suggestion(props) {
    let categoryStyle = {
        fontSize: 10,
        margin: 0,
    }

    let buttonStyle = {
        display: "block",
        color: "#777",
        width: "auto",
        textAlign: "start",
        padding: 12,
        margin: 0, 
        borderStyle: "none",
        outline: "none",
        background: "none",
        fontSize: 20,
        cursor: "pointer",
    }

    let arr = [];
    for (let i in props.results) {
        arr.push(
            <li key={props.results[i]} id={props.id_li}>
                <button 
                    style={buttonStyle} 
                    onClick={() => props.updateToSuggestion(props.results[i])}
                >
                    {props.results[i][1]}
                    <p style={categoryStyle}>{props.results[i][0]}</p>
                </button>
            </li>
        )
    }

    return <ul id={props.id_ul}>{arr}</ul>
}

export default Suggestion;