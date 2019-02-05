import React  from 'react';

function Button(props) {
    let style = {
        width: "110px",
        height: "40px",
        margin: 0,
        padding: "8px 15px",
        fontSize: "13px",
        outline: "none",
        borderRadius: "4px",
        borderStyle: "none",
        backgroundColor: props.backgroundColor
    }

    return (
        <button 
            style={style} 
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}

export default Button;