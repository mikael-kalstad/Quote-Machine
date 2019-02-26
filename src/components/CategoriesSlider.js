import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';
import CategoryBox from './CategoryBox';

function CategoriesSlider(props) {
    let categoryBoxes = [];
    let data = props.categoryData;

    const checkForKey = (obj, keyName) => {
        if (obj.hasOwnProperty(keyName)) return true;
        console.log("Error in category data, unknown keyname in file \"Categories.json\"");
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        // Requires that name and logo are defined, otherwise it will not be rendered
        if (!checkForKey(data[i], "name") || !checkForKey(data[i], "logo")) continue;

        categoryBoxes.push(
            <CategoryBox
                key={i}
                name={props.categoryData[i]["name"]}
                logo={props.categoryData[i]["logo"]}
                onClick={props.onClick}

                // Last box needs right margin
                margin={ i === props.categoryData.length-1 ? "0 30px 0 0" : 0}
               
                animeProps = {{
                    easing: 'easeInOutElastic',
                    delay: i * 100 + 600,
                    duration: 100,
                    opacity: [0, 1],
                    translateX: [500, 0]
                }}
            ></CategoryBox>
        )
    }

    const Container = styled.div`
        align-self: start;
        width: fit-content;
        display: grid;
        grid-gap: 40px;
        grid-auto-flow: column;
    `;

    const Slider = styled.div`
        max-width: 100%;
        padding: 30px;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        /* transform: rotate(-90deg); */
        
       
        ::-webkit-scrollbar {
            background-color:#03998D;
            width:10px; 
        }

        ::-webkit-scrollbar-track {
            background-color:#03998D;
            margin: 30px;
            
        }

        ::-webkit-scrollbar-thumb {
            background-color: #cecece;
            border-radius:16px;
        }
    `;
    
    // If animation is defined
    if (typeof props.animeProps !== 'undefined') {
        return (
            <Anime {...props.animeProps}>
                <Slider>
                    <Container>
                        {categoryBoxes}
                    </Container>
                </Slider>
            </Anime>
        )
    }

    return (
        <Slider>
            <Container>
                {categoryBoxes}
            </Container>
        </Slider>
    )
}

export default CategoriesSlider;