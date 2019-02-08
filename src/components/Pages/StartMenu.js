import React from 'react';
import List from '../List';
import Button from '../Button';
import Anime from 'react-anime';


function StartMenu(props) {
    const hslIncreaseLightness = (increase) => {;
        // Find the lightness in the hsl color
        let light = props.color.match(/\d{2}/g)[2];
        // Add increase to it
        let newLight = (Number.parseInt(light)+increase).toString();
        return props.color.replace(light, newLight) // New color
    }


    let titleStyle = {
        fontSize: 110,
        position: "absolute",
        top: "20%",
        left: "42%",
        transform: "translate(-50%, -50%)"
    }

    let titleDuration = 1500

    return (
        <div id="menu-wrapper">
            <Anime 
                easing='easeInOutElastic'
                delay={500}
                duration={titleDuration}
                // loop={true}
                translateY='100px'
                opacity={[0.01, 1]}
                
            > 
                <h1 className="title" style={titleStyle}>Quotes</h1>
            </Anime>


            <Button 
                name="Movie"
                id="movie"
                onClick={() => props.onClick("Movie")}
                width='50vw'
                height='100vh'
                fontSize='40px'
                backgroundColor='#71bed6'
            />

            <Button 
                name="Programming"
                id="programming"
                onClick={() => props.onClick("Programming")}
                width= '50vw'
                height= '100vh'
                fontSize='40px'
                backgroundColor='#ef5858'
            />
        </div>
    )
}

export default StartMenu;