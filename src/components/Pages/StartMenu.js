import React from 'react';
import CategoriesSlider from '../CategoriesSlider';

import Anime from 'react-anime';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #03998D;
    width: 100%;
    min-height: 100vh;
    padding: 40px 0 40px 40px;
    display: grid;
    grid-template-rows: 150px 1fr 100px auto 30px;
    align-items: end;

    @media screen and (max-width: 850px) {
        padding: 0;
    }
`

const Title = styled.h1`
    color: #EEDF08;
    padding-left: 45px;
    margin: 0;
    font-family: 'Abril Fatface', sans-serif;
    font-weight: 500;
    font-size: 130px;
   
    @media screen and (max-width: 1100px) {
        font-size: 100px;
    }

    @media screen and (max-width: 850px) {
        text-align: center;
        padding-left: 0;
    }    
`

const CategoryText = styled.p`
    color: #DEDEDC;
    padding-left: 55px;
    padding-bottom: 20px;
    margin: 0;
    font-family: Helvetica;
    font-size: 60px;
    font-weight: 100;

    @media screen and (max-width: 1100px) {
        font-size: 50px;
    }
`

const QuoteSVG = styled.img`
    max-width: 1000px;
    width: 70%;
    margin-right: 90px;
    align-self: center;
    content: url('logos/Start Menu/quoteTounge.svg');

    @media screen and (max-width: 1100px) {
        content: url('logos/Start Menu/quoteToungeSmall.svg');
        margin: auto;
    }
`

function StartMenu(props) {
    let titleDuration = 400;

    return (
        <Wrapper>
            <Anime
                easing='easeInOutElastic'
                delay={titleDuration-500}
                duration={800}
                opacity= {[0, 1]}
                translateY= {[100, 0]}
            > 
                <Title>Quotes.</Title>
            </Anime>
                
            <Anime
                easing='easeInOutElastic'
                delay={titleDuration-500}
                duration={800}
                opacity= {[0, 1]}
                translateY= {[100, 0]}
            > 
                <QuoteSVG></QuoteSVG>
            </Anime>

            <Anime
                easing='easeInOutElastic'
                delay={titleDuration-500}
                duration={800}
                opacity= {[0, 1]}
                translateY= {[400, 0]}
            >
                <CategoryText>Categor{props.categoryData.length > 1 ? 'ies' : 'y'}</CategoryText>
            </Anime>
            
            <CategoriesSlider
                categoryData={props.categoryData}
                onClick={props.onClick}
            >   
            </CategoriesSlider>
        </Wrapper>
    )
}

export default StartMenu;