import React  from 'react';
import styled from 'styled-components';
import Icon from './Icon';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

// library.add(fab, faCheckSquare, faCoffee)

function QuoteBox(props) {
    const Container = styled.div`
        width: ${props.width};
        color: ${props.color};
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
    `

    const Quote = styled.p`
        grid-area: quote;
        font-size: 28px;
    `

    const QuoteSymbol = styled.i`
        padding-right: 10px;
        font-size: 37px;
    `

    const Author = styled.p`
        grid-area: author;
        justify-self: end;
        margin-right: 20px;
    `

    const Twitter = styled.div`
        grid-area: twitter;
    `

    const Tumblr = styled.div`
        grid-area: tumblr;
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
        background-color: ${props.color};
        outline: none;
        border-radius: 4px;
        border-style: none;
        background-color: ${props.backgroundColor};
        cursor: pointer;
    `

    let twitterLink="https://www.twitter.com/intent/tweet?text=Check out this quote: \"" + props.quote + "\"";

    return (
        <Container>
            <Quote>
                <QuoteSymbol className="fas fa-quote-left"></QuoteSymbol>
                {props.quote}
            </Quote>

            <Author>- {props.author}</Author>

            <Twitter>
                <Icon 
                    link={twitterLink}
                    classNameI="fab fa-twitter"
                    classNameA="icon"
                    target="_blank"
                />
            </Twitter>

            <Tumblr>
                <Icon 
                    link="https://www.tumblr.com"
                    classNameI="fab fa-tumblr"
                    classNameA="icon"
                    target="_blank"
                />
            </Tumblr>
            
            {/* <Loading 
                id="loading"
                isLoading={props.isLoading}
                delay={500}
            /> */}

            <Button onClick={props.onClick}>
                New Quote
            </Button>
        </Container>
    )
}

export default QuoteBox;