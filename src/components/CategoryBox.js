import React from 'react';
import styled from 'styled-components';

function CategoryBox(props) {
    const Box = styled.div`
        width: ${width => props.width ? props.width : "300px"};
        height: ${height => props.height ? props.height : "200px"};
        background-color: ${backgroundColor => props.backgroundColor ? props.backgroundColor : "#03897E"};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;

        display: grid;
        grid-template-rows: 60% 40%;
        justify-items: center;
        align-items: center;
        transition: transform 100ms ease-in-out;
       
        :hover {
            transform: scale(1.1);
        }

        @media screen and (max-width: 1100px) {
            width: 250px;
            height: 150px;
        }
    `;
    
    const Image = styled.img`
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
    `;

    const Text = styled.p`
        font-family: ;
        font-size: ${fontSize => props.fontSize ? props.fontSize: "25px"};
        color: ${color => props.color ? props.color: "whitesmoke"};
    `;

    return (
        <Box onClick={props.onClick}>
            <Image src={props.img}></Image>
            <Text>{props.name}</Text>
        </Box>
    )
}

export default CategoryBox;