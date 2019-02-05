import React from 'react';
import './InfoBox.css'
import posed, { PoseGroup } from 'react-pose';

const Animation = posed.div({
    'hidden': { scale: 0 },
    'visible': { scale: 1.0 }
});

function InfoBox(props) {
    return (
        <Animation pose = {props.visibility ? 'visible' : 'hidden'}>
            <div id="infobox" style={{display: props.visibility ? 'block' : 'none'}}>
                {/* Exit symbol top-rigth corner */}
                <a id="exit" href="#" onClick={props.onClick}>
                    <i className="fas fa-times"></i>
                </a>

                <h2>{props.title}</h2>
                <hr />
                <p>{props.text}</p>
            </div>
        </Animation>
    )
}


export default InfoBox;