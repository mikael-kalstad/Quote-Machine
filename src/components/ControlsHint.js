import React from 'react';
import styled from 'styled-components';

let containerHeight = '100px';

const Container = styled.div`
    text-align: center;
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