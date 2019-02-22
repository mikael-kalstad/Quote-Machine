import React from 'react';
import CategoriesSlider from '../CategoriesSlider';
import quoteIcon from '../../img/quotes.png';
import TextAnimation from '../TextAnimation';

import Anime from 'react-anime';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-color: #03998D;
    width: 100%;
    min-height: 100vh;
    padding: 40px 0 40px 40px;
    display: grid;
    grid-template-rows: 150px auto 100px 1fr;
    align-items: end;

    @media screen and (max-width: 850px) {
        padding: 0;
    }
`

const Title = styled.h1`
    color: #EEDF08;
    padding-left: 45px;
    margin: 0;
    font-family: 'Abril Fatface';
    font-size: 130px;
   
    @media screen and (max-width: 1100px) {
        font-size: 100px;
    }

    @media screen and (max-width: 850px) {
        text-align: center;
        padding-left: 0;
    }
`

const QuoteText = styled.p`
    color: whitesmoke;
    padding: 40px;
    font-family: Helvetica;
    font-size: 40px;
    align-self: center;
    
    @media screen and (max-width: 1100px) {
        font-size: 35px;
    }

    @media screen and (max-width: 850px) {
        /* padding: 0 40px 0 0; */
        text-align: center;
        /* margin: auto; */
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

const Image = styled.img`
    width: 80px;
    padding-right: 20px;
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
                <QuoteText><Image src={quoteIcon}></Image>A quote is just a tattoo on the tongue</QuoteText>
            </Anime>

            <Anime
                easing='easeInOutElastic'
                delay={titleDuration-500}
                duration={800}
                opacity= {[0, 1]}
                translateX= {[700, 0]}
            >
                <CategoryText>Categories</CategoryText>
            </Anime>

            <CategoriesSlider
                categoryNames={props.categoryNames}
                categoryLogos={props.categoryLogos}
                onClick={props.onClick}
            >   
            </CategoriesSlider>
        </Wrapper>
    )
}

export default StartMenu;