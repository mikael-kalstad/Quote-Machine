import React, { Component }  from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuoteBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 1
        }
    }

    onClick = () => {
        this.props.onClick();

        // Fade text in and out
        this.setState({ opacity: 0 })
        setTimeout(() => {
            this.setState({ opacity: 1 })
        }, 1000);
    }

    render() {
        const Container = styled.div`
            width: ${this.props.width};
            color: ${this.props.color};
            align-self: center;
            font-family: 'Source Sans Pro', sans-serif;
            text-align: center;
            padding: 30px;
            background-color: white;
            border-radius: 12px;    
            margin: 0 auto;

            display: grid;
            grid-template-rows: auto 50px 45px;
            grid-template-columns: 50px 50px auto;
            grid-gap: 10px;
            grid-template-areas: 
            " quote quote quote"
            " . . author "
            " twitter tumblr newQuote ";

            @media screen and (max-width: 650px) {
                width: 100%;

                grid-template-rows: auto 50px 45px auto;
                grid-template-columns: 50px 50px auto;

                grid-template-areas: 
                " quote quote quote"
                " . . author "
                " twitter tumblr . "
                "newQuote newQuote newQuote";
            }
        `

        const Quote = styled.p`
            grid-area: quote;
            font-size: 28px;
            /* transition: opacity 1.5s ease-in-out; */
            
            @media screen and (max-width: 650px) {
                font-size: 22px;
            }
        `

        const QuoteSymbol = styled.span`
            padding: 15px;
            font-size: 40px;
        `

        const Author = styled.p`
            grid-area: author;
            justify-self: end;
            margin-right: 20px;
            /* transition: all 3s ease; */
        `

        const Icon = styled.a`
            cursor: pointer;
            color: inherit;
            font-size: 30px;
            grid-area: ${props => props.gridArea || ''};
            /* transition: all 2s ease; */
        `

        const Button = styled.button`
            grid-area: newQuote;
            justify-self: end;
            margin-right: 20px;
            padding: 8px 15px;
            width: 110px;
            height: 40px;
            font-size: 13px;
            color: white;
            background-color: ${this.props.color};
            outline: none;
            border-radius: 4px;
            border-style: none;
            background-color: ${this.props.backgroundColor};
            cursor: pointer;

            @media screen and (max-width: 650px) {
                width: 240px;
                height: 60px;
                font-size: 20px;
            }
        `

        let twitterLink="https://www.twitter.com/intent/tweet?text=Check out this quote: \"" + this.props.quote + "\", " + this.props.author;
        
        // let contentStyle = {
        //     opacity: this.state.opacity,
        //     transition: "opacity 0.38s ease"
        // }

        return (
            <Container>
                
                <Quote>
                    <QuoteSymbol>
                        <FontAwesomeIcon icon={"quote-left"} />
                    </QuoteSymbol>
                    {this.props.quote}
                </Quote>
                {/* <p style={contentStyle}>without styles component</p> */}

                <Author>- {this.props.author}</Author>
    
                <Icon gridArea="twitter" href={twitterLink} target="_blank">
                    <FontAwesomeIcon icon={["fab" ,"twitter"]} />
                </Icon>
    
                <Icon gridArea="tumblr" href="https://www.tumblr.com" target="_blank">
                    <FontAwesomeIcon icon={["fab" ,"tumblr"]} />
                </Icon>
    
                <Button onClick={this.onClick}>
                    New Quote
                </Button>
            </Container>
        )
    }
}

export default QuoteBox;