/* 
* Props that can be passed: 
*   - Id for wrapper div
*   - Link, for the a tag
*   - Style, general styling for the a tag
*   - className, for the i tag (uses the 'font awsome' library)
*  
*/

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Link = styled.a`
    text-decoration: none;
    
    :visited {
        color: inherit;
    }
`

function Icon(props) {
    return (
        <div style={props.style}>
            <Link 
                className={props.classNameA} 
                href={props.link} onClick={props.onChange} 
                target={props.target}
            >
                <FontAwesomeIcon icon="props.iconName" />
            </Link>
        </div>
    )
}

export default Icon;