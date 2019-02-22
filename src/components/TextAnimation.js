import React from 'react';
import Anime from 'react-anime';

function TextAnimation(props) {
    let elems = []

    props.children.split('').forEach(letter => {
        elems.push(<props.wrapper>{letter}</props.wrapper>) 
    });
   
    return (
        <Anime
            easing={"easeOutExpo"}
            delay={(el, i) => i*45+ 1000}
            duration={1300}
            rotateY={[-90, 0]}
        >
            {elems}
        </Anime>
    );
}

export default TextAnimation;