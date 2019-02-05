import React  from 'react';
import Button from '../Button';
import Icon from '../Icon';
import './QuoteBox.css';
import Loading from '../Loading';

function QuoteBox(props) {
    let opacity = props.isLoading ? 0 : 1;

    let contentStyle = {
        opacity: opacity,
        transition: "opacity 0.38s ease"
    }

    let twitterLink="https://www.twitter.com/intent/tweet?text=Check out this quote: \"" + props.quote + "\"";

    return (
        <div id="container" 
            style = {{color: props.color, width: props.width} }
        >
                <p id="quote" style={contentStyle}>
                    <i className="fas fa-quote-left"></i>
                    {props.quote}
                </p>

                <p id="author" style={contentStyle}>- {props.author}</p>

                <Icon 
                    id="twitter"
                    link={twitterLink}
                    classNameI="fab fa-twitter"
                    classNameA="icon"
                    target="_blank"
                />

                <Icon 
                    id="tumblr"
                    link="https://www.tumblr.com"
                    classNameI="fab fa-tumblr"
                    classNameA="icon"
                    target="_blank"
                />
                
                <Loading 
                    id="loading"
                    isLoading={props.isLoading}
                    delay={500}
                />

                <Button
                    backgroundColor= {props.color}
                    name="New Quote" 
                    onClick={props.onClick}
                />
        </div>
    )
}

export default QuoteBox;