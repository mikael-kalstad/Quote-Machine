import React from 'react';

function Suggestion(props) {
    let categoryStyle = {
        fontSize: 10,
        margin: 0,
    }

    let buttonStyle = {
        display: "inline-block",
        color: "#777",
        width: "100%",
        textAlign: "start",
        padding: 12,
        margin: 0, 
        borderStyle: "none",
        outline: "none",
        background: "none",
        fontSize: 20,
        cursor: "pointer",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
    }

    /*
    Expects an array with value and typename, can have other information, 
    but the first value must be the value and the second must be the typename.

    SYNTAX: 
        arr[0] = value, e.g. James Bond
        arr[1] = typename, e.g Actor
    */

    let arr = [];
    for (let i in props.results) {
        arr.push(
            <li key={i} id={props.id_li}>
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