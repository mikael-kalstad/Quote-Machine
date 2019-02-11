import React from 'react';
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
    
    let buttons = {
        backgroundColor: 'black',
        class: 'btns',
        names: ["Movie", "Programming"],
        ids: ["movie", "programming"]
    }

    let buttonsArr = [];

    buttons.names.forEach(name => {
        buttonsArr.push (
            <Button 
                key={name}
                name={name}
                id={name.toLowerCase()}
                class={buttons.class}
                onClick={() => props.onClick(name)}
                backgroundColor={buttons.backgroundColor}
                
                Animation
                animeProps = {{
                    delay: titleDuration+200,
                    duration: 1900,
                    opacity: [0, 1],
                    borderRadius: [0, 10],
                    translateX: [-100, 0]
                }}
            />
        )
    });

    return (
        <>
            <Anime
                easing='easeInOutElastic'
                delay={500}
                duration={titleDuration}
                opacity= {[0, 1]}
                translateY= {[150, 0]}
                scale={[2, 1]}
            > 
                <h1 className="title" style={titleStyle} ref="myTitle">Quotes</h1>
            </Anime>

            <div id="menu-btns">
                {buttonsArr}
            </div>
        </>
    )
}

export default StartMenu;