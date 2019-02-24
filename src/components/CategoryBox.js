import React from 'react';
import styled from 'styled-components';
import Anime from 'react-anime';

function CategoryBox(props) {
    const Box = styled.div`
        width: ${width => props.width ? props.width : "300px"};
        height: ${height => props.height ? props.height : "200px"};
        background: ${background => props.backgroundColor ? props.backgroundColor : "#03897E"};
        margin: ${margin => props.margin ? props.margin : 0};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
        
        display: grid;
        grid-template-rows: 60% 40%;
        justify-items: center;
        align-items: center;
        transition: transform 150ms ease-in-out;
       
        :hover {
            transform: scale(1.06);
        }

        :active {
            background-color: #EEDF08;
            transition: background-color 300ms;
            transform: scale(1.0);
        }


        @media screen and (max-width: 1100px) {
            width: 250px;
            height: 150px;
        }
    `;
    
    const Logo = styled.img`
        max-width: 80%;
        max-height: 100%;
        object-fit: cover;
    `;

    const Text = styled.p`
        font-family: sans-serif;
        font-size: ${fontSize => props.fontSize ? props.fontSize: "25px"};
        color: ${color => props.color ? props.color: "#DEDDDD"};
    `;

    // If animation is defined
    if (typeof props.animeProps !== 'undefined') {
        return (
            <Anime {...props.animeProps}>
                <Box onClick={() => props.onClick(props.name)}>
                    <Logo src={props.logo}></Logo>
                    <Text>{props.name}</Text>
                </Box>
            </Anime>
        )
    }

    return (
        <Box onClick={props.onClick}>
            <Logo src={props.logo}></Logo>
            <Text>{props.name}</Text>
        </Box>
    )
}

export default CategoryBox;