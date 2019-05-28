import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 225px;
    height: 40px;
    border: 1px solid red;
    display: inline-block;
`

const QuoteText = styled.span`
    background-color: #03998D;
    padding: 0 10px 10px 0;
    width: 225px;
    font-weight: 600;
`

const Eyes = styled.span`
    transition: all 200ms ease;

    ${Wrapper}:active & {
        letter-spacing: 40px;
        margin-left: 40px;
    }
`

const Logo = styled.img`
    position: relative;
    display: inline;
    top: -80px;
    margin-left: 108px;
    max-height: 90px;
    transition: all 200ms ease;
    z-index: -1;

    ${Wrapper}:hover & {
        transform: translateY(90px);
        /* ${logoSrc = "logos/Start Menu/tounge.png"} */
    }

    ${Wrapper}:active & {
        transform: translateY(65px);
        /* ${logoSrc = "logos/Start Menu/tounge2.png"} */
    }
`

let logoSrc = "logos/Start Menu/tounge.png";

function ToungeText() {
    return (
        <Wrapper>
            <QuoteText>to<Eyes>un</Eyes>ge</QuoteText>
            <Logo 
            src={logoSrc}></Logo>
        </Wrapper>
    )
}

export default ToungeText;