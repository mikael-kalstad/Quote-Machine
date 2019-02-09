import React from 'react';
import List from '../List';
import Button from '../Button';
import Anime from 'react-anime';
import './StartMenu.css';

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
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        top: '15%'
    }

    let titleDuration = 1500

    return (
        <>
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

            <div id="menu-btns">
                <Button 
                    name="Movie"
                    id="movie"
                    onClick={() => props.onClick("Movie")}
                    width='300px'
                    height='70px'
                    fontSize='30px'
                    backgroundColor='black'
                />

                <Button 
                    name="Programming"
                    id="programming"
                    onClick={() => props.onClick("Programming")}
                    width='300px'
                    height='70px'
                    fontSize='30px'
                    backgroundColor='black'
                />
            </div>
        </>
    )
}

export default StartMenu;