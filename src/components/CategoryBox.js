import React from 'react';
import styled from 'styled-components';

function CategoryBox(props) {
    const Container = styled.div`
        width: ${props.width ? props.width : "300px"};
        height: ${props.height ? props.height : "300px"};

        @media screen and (max-width: 1100px) {
            width: 250px;
            height: 150px;
        }
    `

    const Box = styled.div`
        width: ${props.width ? props.width : "300px"};
        height: ${props.height ? props.height : "200px"};
        background: ${props.backgroundColor ? props.backgroundColor : "#03897E"};
        margin: ${props.margin ? props.margin : 0};
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
        transform: ${props => props.rotate};
    `;

    const Text = styled.p`
        font-family: sans-serif;
        font-size: ${props.fontSize ? props.fontSize: "25px"};
        color: ${props.color ? props.color: "#DEDDDD"};
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

        ${Container}:hover & {
            transform: translateY(-60px);
        }

        ${Container}:active & {
            transform: translateY(-40px);
        }
    `

    // Add hover logos if they are defined
    let hover_logo_elements = [];
    let rotateAngle;
    let rotateAngleIncrease = 15;

    for (let i in props.hoverLogos) {
        console.log("left i", i, Math.floor((props.hoverLogos.length-1)/2) >= i);
        console.log("right i", i, Math.round((props.hoverLogos.length-1)/2) <= i);
        // If it is the logo in the middle
        if (props.hoverLogos.length % 2 !== 0 && Math.floor((props.hoverLogos.length-1)/2 == i)) {
            rotateAngle = 0;
        }


        
        // If it is a logo on the left side (negative value)
        else if (Math.floor((props.hoverLogos.length-1)/2) >= i) rotateAngle = i != 0 ? -rotateAngleIncrease*(i/2) : -5;

        // If it is a logo on the right side (positive value)
        else if (Math.round((props.hoverLogos.length-1)/2) <= i) rotateAngle = rotateAngleIncrease*(i/2);

        console.log("angle", rotateAngle);


        hover_logo_elements.push(
            <Logo 
                key={props.hoverLogos[i]} 
                src={props.hoverLogos[i]}
                color='red'
                rotate={'rotate(' + rotateAngle + 'deg)'}
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