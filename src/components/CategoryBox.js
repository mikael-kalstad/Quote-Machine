import React from 'react';
import styled from 'styled-components';

function CategoryBox(props) {
    const Container = styled.div`
        width: ${props.width ? props.width : "300px"};
        height: ${props.height ? props.height : "270px"};
    
        /* @media screen and (max-width: 1100px) {
            width: 250px;
            height: 150px;
        } */

        margin: ${props.margin ? props.margin : 0};
    `

    const Box = styled.div`
        /* width: ${props.width ? props.width : "300px"};
        height: ${props.height ? props.height : "200px"}; */
        width: 100%;
        height: 70%;
        padding: 10px;
        background: ${props.backgroundColor ? props.backgroundColor : "#03897E"};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 10px;
        cursor: pointer;
        position: relative;
        z-index: 10;
        
        display: grid;
        grid-template-rows: 70% 30%;
        justify-items: center;
        align-items: center;
        transition: transform 150ms ease-in-out;
       
        :hover {
            transform: scale(1.08);
        }

        :active {
            background-color: #777;
            transition: background-color 500ms ease;
            transform: scale(1.0);
        }
    `;
    
    const Logo = styled.img`
        max-width: 80%;
        max-height: 100%;
        object-fit: cover;
        transition: transform 350ms ease;
        

        ${Container}:hover & {
            transform: ${props => props.translateHover} ${props => props.rotate};
        }

        ${Container}:active & {
            transform: ${props => props.translateClick} ${props => props.rotateClick};
        }
    `;

    const Text = styled.p`
        font-weight: 200;
        font-size: ${props.fontSize ? props.fontSize: "27px"};
        color: ${props.color ? props.color: "white"};
    `;

    const ImageHover = styled.div`
        width: 100%;
        height: 80px;
        position: relative;
        display: grid;
        grid-template-columns: repeat(${props.hoverLogos.length}, 1fr);
        align-items: center;
        justify-items: center;
        top: 30%;
        z-index: 1;
        transition: transform 350ms ease;
    `

    // Transform values for logos
    let r = 15;
    let y = 70;

    let logoStyle = {
        "1": [[0, y]],
        "2": [[r, y], [-r, y]],
        "3": [[r, y*0.8], [0, y], [-r, y*0.8]],
        "4": [[r, y*0.8], [r*0.8, y], [-r*0.8, y], [-r, y*0.8]],
        "5": [[r, y*0.7], [r*0.8, y*0.8], [0, y], [-r*0.8, y*0.8], [-r, y*0.7]],
    }

    // Add hover logos if they are defined
    let hover_logo_elements = [];
    
    for (let i = 0; i < props.hoverLogos.length; i++) {
        hover_logo_elements.push(
            <Logo 
                key={i} 
                src={props.hoverLogos[i]}
                color='red'
                rotate={'rotate(' + logoStyle[props.hoverLogos.length][i][0] + 'deg)'}
                rotateClick={'rotate(' + logoStyle[props.hoverLogos.length][i][0] * 0.6 + 'deg)'}
                translateHover={'translateY(-' + logoStyle[props.hoverLogos.length][i][1] + 'px)'}
                translateClick={'translateY(-' + logoStyle[props.hoverLogos.length][i][1] * 0.6 + 'px)'}
            ></Logo>
        )
    }

    return (
        <Container>
             <ImageHover>{hover_logo_elements}</ImageHover>

            <Box onClick={() => props.onClick(props.name)}>
                <Logo src={props.logo}></Logo>
                <Text>{props.name}</Text>
            </Box>
        </Container>
    )
}

export default CategoryBox;