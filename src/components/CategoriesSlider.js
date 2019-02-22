import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';
import CategoryBox from './CategoryBox';

function CategoriesSlider(props) {
    let categoryBoxes = [];

    for (let i = 0; i < props.categoryNames.length; i++) {
        categoryBoxes.push(
            <CategoryBox
                img={props.categoryLogos[i]}
                name={props.categoryNames[i]}
                onClick={props.onClick}
                margin={ i === props.categoryNames.length-1 ? "0 30px 0 0" : 0}
               
                animeProps = {{
                    easing: 'easeInOutElastic',
                    delay: i * 130 + 1000,
                    duration: 130,
                    opacity: [0, 1],
                    // translateX: [700, 0]
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