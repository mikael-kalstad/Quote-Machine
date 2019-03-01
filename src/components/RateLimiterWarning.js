import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';

let backgroundColor = '#F1F1F1';

const Container = styled.div`
    /* width: 400px; */
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

const MessageDialog = styled.div`
    
`

const Text = styled.p`
    color: white;
    font-size: 12px;
`

const Image = styled.img`
    width: 100%;
`

function RateLimiterWarning(props) {
    // let component = (
    //     <Container>
    //         <MessageDialog>
    //             <MessageBox>Slow Down!</MessageBox>
    //             <Arrow></Arrow>
    //         </MessageDialog>
    //         <Image src='/logos/snail.png'></Image>
    //         <Text>You have been visited by the rate limiter snail.</Text>
    //     </Container>
    // )

    
    // If animation is defined
    return (
        // <Anime
        //     easing='easeInOutElastic'
        //     delay={500}
        //     duration={800}
        //     opacity= {[0, 1]}
        //     translateY= {[400, 0]}
        // >
            <Container>
                <MessageDialog>
                    <MessageBox>Slow Down!</MessageBox>
                    <Arrow></Arrow>
                </MessageDialog>
                <Image src='/logos/snail.png'></Image>
                <Text>You have been visited by the rate limiter snail. 
                    Snails and bandwith have one thing in common, they don't grow on trees.</Text>
            </Container>
        // </Anime>
    )
}

export default RateLimiterWarning;