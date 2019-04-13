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
        overflow: "hidden"
    }

    /*
    Expects an array with value and typename, can have other information, 
    but the first value must be the value and the second must be the typename.

    SYNTAX: 
        arr[0] = typename, e.g Actor
        arr[1] = value, e.g. James Bond
        
    */

    let arr = [];
    // console.log(props.suggestions[0][0]);
    // if (props.suggestions[0][0] === "Message") console.log("message!")
    for (let i in props.suggestions) {
        arr.push(
            <li key={i} id={props.id_li}>

                {/* Check typename is blank, then it is a system message, should not be clickable */}
                {props.suggestions[i][0] === "Message" ? 
                    <button style={{...buttonStyle, cursor: "default"}}>
                        {props.suggestions[i][1]}
                        <p style={categoryStyle}>{props.suggestions[i][0]}</p>
                    </button>
                    :
                    <button 
                        style={buttonStyle} 
                        onClick={() => props.updateToSuggestion(props.suggestions[i])}
                    >
                        {props.suggestions[i][1]}
                        <p style={categoryStyle}>{props.suggestions[i][0]}</p>
                    </button>
                }
            </li>
        )
    }

    return <ul id={props.id_ul}>{arr}</ul>
}

export default Suggestion;