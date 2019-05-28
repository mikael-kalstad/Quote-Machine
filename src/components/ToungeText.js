import React, { Component } from 'react';
import styled from 'styled-components';

class ToungeText extends Component {
    constructor() {
        super();
        this.state = {
            logoSrc: "logos/Start Menu/tounge.png"
        }
    }

    Wrapper = styled.div`
        width: 225px;
        height: 40px;
        display: inline-block;
    `

    QuoteText = styled.span`
        background-color: #03998D;
        padding: 0 10px 10px 0;
        width: 225px;
        font-weight: 600;
        /* margin-left: 13px; */
    `

    Eyes = styled.span`
        transition: all 200ms ease;

        ${this.Wrapper}:active & {
            letter-spacing: 40px;
            margin-left: 40px;
        }
    `

    Logo = styled.img`
        position: absolute;
        margin-left: 80px;
        max-height: 90px;
        transition: all 200ms ease;
        z-index: -1;

        ${this.Wrapper}:hover & {
            transform: translateY(90px);
        }

        ${this.Wrapper}:active & {
            margin-left: 125px;
            /* transform: translateY(65px); */
        }
    `

    render() {
        return (
            <this.Wrapper 
                onMouseDown={() => this.setState({ logoSrc: "logos/Start Menu/tounge2.png"})}
                onMouseUp={() => this.setState({ logoSrc: "logos/Start Menu/tounge.png" })}
                onMouseEnter={() => this.setState({ logoSrc: "logos/Start Menu/tounge.png" })}
            >
                <this.Logo src={this.state.logoSrc}></this.Logo>
                <this.QuoteText>to<this.Eyes>un</this.Eyes>ge</this.QuoteText>
            </this.Wrapper>
        )
    }
}

export default ToungeText;