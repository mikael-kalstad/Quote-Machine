import React from 'react';
import './Loading.css';

function Loading(props) {
    return (
        <div 
            className="spinner"
            id={props.id}
            style={props.isLoading ? {opacity: 1} : {opacity: 0}}
        >
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    )
}

export default Loading;