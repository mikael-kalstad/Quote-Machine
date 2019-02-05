import React from 'react';

function List(props) {
    let buttonStyle = {
        outline: "none",
        border: "none",
        marginTop: 30,
        textAlign: "start",
        // width: "100%",
        fontSize: "28px",
        background: "none",
        cursor: "pointer"
    }

    let ulStyling = {
        listStyleType: "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }

    let arr = [];
    props.items.forEach(elem => {
        arr.push(
            <li key={elem}>
                <button 
                    onClick={props.onClick} 
                    id={elem}
                    style={buttonStyle}
                >
                    {elem}
                </button>
            </li>
        );
    });
    
    return (
        <ul style={ulStyling}>{arr}</ul>
    )
}

export default List;