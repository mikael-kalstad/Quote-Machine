/* 
* Props that can be passed: 
*   - Id for wrapper div
*   - Link, for the a tag
*   - Style, general styling for the a tag
*   - className, for the i tag (uses the 'font awsome' library)
*  
*/

import React from 'react';

function Icon(props) {
    return (
        <div style={props.style} id={props.id}>
            <a className={props.classNameA} href={props.link} onClick={props.onChange} target={props.target}>
                <i className={props.classNameI}></i>
            </a>
        </div>
    )
}

export default Icon;