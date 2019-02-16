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
            ></CategoryBox>
        )
    }

    const Wrapper = styled.div`
        align-self: start;
        padding: 30px;
        height: fit-content;
        max-width: 100%;
        display: grid;
        grid-gap: 40px;
        grid-auto-flow: column dense;

        -webkit-overflow-scrolling: touch;
        overflow-x: auto;
        /* transform: rotate(-90deg); */
       
        ::-webkit-scrollbar {
            background-color:#03998D;
            width:10px; 
        }

        ::-webkit-scrollbar-track {
            background-color:#03998D;
            
        }

        ::-webkit-scrollbar-thumb {
            background-color: #cecece;
            border-radius:16px;
            /* border:4px solid #fff */
        }

        ::child{
            margin-right: 20px;
        }
    `;
    
    // If animation is defined
    if (typeof props.animeProps !== 'undefined') {
        return (
            <Anime {...props.animeProps}>
                {categoryBoxes}
            </Anime>
        )
    }

    return (
        <Wrapper>
            {categoryBoxes}
        </Wrapper>
        
    )
}

export default CategoriesSlider;