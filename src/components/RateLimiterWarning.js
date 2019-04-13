import React from 'react';
import styled from 'styled-components';

let backgroundColor = '#F1F1F1';

const Container = styled.div`
    display: grid;
    grid-template-areas: 
    "image"
    "message";
`
const Text = styled.p`
    grid-area: 'message';
    color: white;
    font-size: 15px;   
`

// Container for snail img and msg dialog
const Snail = styled.div`
    grid-area: 'image';
`

const MessageBox = styled.div`
    width: 70%;
    height: 70px;
    background-color: ${backgroundColor};
    border-radius: 40px;
    color: #F58252; 
    font-size: 28px;
    text-align: center;
    line-height: 70px;
`

const Arrow = styled.div`
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 6px solid transparent;
    border-top: 20px solid ${backgroundColor};
    margin-left: 40px;
`

const Image = styled.img`
    width: 100%;
`

function RateLimiterWarning(props) {
    return (
        <Container>
            <Snail>
                <MessageBox>Slow Down!</MessageBox>
                <Arrow></Arrow>
                <Image src='/logos/snail.png'></Image>
            </Snail>

            <Text>You have been visited by the rate limiter snail. 
                Snails and bandwith have one thing in common, they don't grow on trees.</Text>
        </Container>
    )
}

export default RateLimiterWarning;