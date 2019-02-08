import React  from 'react';

function Button(props) {
    let style = {
        width: props.width,
        height: props.height,
        margin: 0,
        padding: "8px 15px",
        fontSize: props.fontSize,
        outline: "none",
        borderRadius: "4px",
        borderStyle: "none",
        backgroundColor: props.backgroundColor,
        cursor: 'pointer'
    }

    return (
        <button 
            style={style} 
            id={props.id}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )
}

Button.defaultProps = {
    width: "110px",
    height: "40px",
    fontSize: "13px",
}

export default Button;
