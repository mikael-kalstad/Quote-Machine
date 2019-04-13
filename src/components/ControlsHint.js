import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    text-align: center;
    display: absolute;
    transition: transform 250ms ease-in-out;
    animation: hint 400ms 2 ease-in-out;

    @keyframes hint {
        50% {transform: translateY(-50px)}
        100% {transform: translateY(0px)}
    }

    @media screen and (max-width: 700px)  {
        display: none;
    }
`

const SpaceKey = styled.span`
    margin: 15px;
    padding: 4px 35px;
    border-radius: 4px;
    color: #F50057;
    background: #CFD8DC;
    box-shadow: 0 7px 0 #90A4AE;
    font-weight: 900;
`;

const EnterKey = styled.img`
    margin-top: 20px;
    padding: 3px 20px;
    width: 100px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`
const Text = styled.span`
    font-size: 28px;
    color: white;
    line-height: 100px;
    font-weight: 600;
`

function ControlsHint() {
    return (
        <Container>
            <Text>Tip: Use</Text>
            <SpaceKey>Space</SpaceKey>
            <Text>or</Text>
            <EnterKey src='/logos/enterKey.png'></EnterKey>
            <Text>to refresh to a new quote</Text>
        </Container>
    )
}

export default ControlsHint;