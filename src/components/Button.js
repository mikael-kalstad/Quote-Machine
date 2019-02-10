import React  from 'react';
import Anime from 'react-anime';

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
        color: props.textColor,
        cursor: 'pointer',
    }

    let button = (
        <button 
            style={style} 
            id={props.id}
            className={props.class}
            onClick={props.onClick}
        >
            {props.name}
        </button>
    )

    // If animation is defined
    if (typeof props.animeProps !== 'undefined') {
        return (
            <Anime {...props.animeProps}>
                {button}
            </Anime>
        )
    }
  
    // Return button without animation
    return (
        button
    )
}


export default Button;
