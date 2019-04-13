import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';
import CategoryBox from './CategoryBox';

function CategoriesSlider(props) {
    let categoryBoxes = [];
    let data = props.categoryData;

    const checkForKey = (obj, keyName) => {
        if (obj.hasOwnProperty(keyName)) return true;
        // console.log("Error in category data, unknown keyname \"" + keyName + "\" in file \"Categories.json\"");
        return false;
    }

    for (let i = 0; i < data.length; i++) {
        // Requires that name, logo and api-function are defined, otherwise it will not be rendered.
        // Search functionality and hover logos are optional.
        if (!checkForKey(data[i], "name") 
            || !checkForKey(data[i], "logo") 
            || !checkForKey(data[i], "api_function")) continue;

        let hover_logos = [];
        if (checkForKey(data[i], "hover_logos")) hover_logos=data[i]["hover_logos"];
        
        categoryBoxes.push(
            <CategoryBox
                key={i}
                name={props.categoryData[i]["name"]}
                logo={props.categoryData[i]["logo"]}
                hoverLogos={hover_logos}
                onClick={props.onClick}

                // Last box needs right margin
                margin={ i === props.categoryData.length-1 ? "0 30px 0 0" : 0}
               
               
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

    let scroll_borderRadius = '16px';
    let scroll_color = '#cecece';

    const Slider = styled.div`
        max-width: 100%;
        padding: 30px;
        -webkit-overflow-scrolling: touch;
        overflow-x: auto;        
       
        ::-webkit-scrollbar {
            height: 10px; 
        }

        /* The empty space “below” the progress bar. */
        ::-webkit-scrollbar-track {
            background-color: #F5F5F5;
            border: 1px solid ${scroll_color};
            border-radius: ${scroll_borderRadius};
            margin: 30px;
        }

        /*  The draggable scrolling element resizes depending on the size of the scrollable element. */
        ::-webkit-scrollbar-thumb {
            background-color: ${scroll_color};
            border-radius: ${scroll_borderRadius};
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