import React, { Component } from 'react';
import styled from 'styled-components';

import QuoteBox from '../QuoteBox';
import Icon from '../Icon';
import SearchBar from '../Search/SearchBar';
// import Anime from 'react-anime';

class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            filter: []
        }
        // Initializer, get quote
        this.handleClick();
    }
    
    // Update method for button and search
    handleClick = ()  => {
        this.props.updateColor();
    }

    // Method that child will call to update moviefilter
    updateFilter = (arr) => {
        if (arr === undefined) return undefined;
        if (arr[0] === "content") this.setState({ quote: arr[2], author: arr[3]+', '+arr[4] });
        else {
            // Always the last in the array that needs to be lowercase with - between words
            arr[arr.length-1] = arr[arr.length-1].toLowerCase().trim().split(' ').join('-');
            
            this.setState({ filter: arr });
            this.handleClick(); // Update the quote with the moviefilter applied
        }
    }

    resetFilter = () => this.setState({ movieFilter: [] })

    random = (min, max) => Math.round(min + Math.random()*(max-min));
    
    Container = styled.div`
        height: 100vh;
        background-color: ${props => props.color};
        display: grid;
        grid-template-rows: ${searchbar => searchbar ? "auto 60px 1fr" : "auto 1fr"};
    `

    Title = styled.h1`
        text-align: center;
        color: white;
        font-size: 50px;
    `

    render() {
        console.log(this.props.color);
        return (
            <this.Container color={this.props.color}>
                <this.Title> {this.props.quoteCategory} Quotes</this.Title>
                
                <Icon 
                    id="goBack"
                    link=""
                    classNameI="fas fa-chevron-circle-left"
                    classNameA="icon-goBack"
                />

                {this.props.searchbar && 
                    <SearchBar 
                        containerStyle={{width: "400px"}}
                        updateFilter={this.updateFilter}
                        resetFilter={this.resetFilter}
                        placeHolder="James Bond..."
                        // minCharactersBeforeUpdate="2"
                        suggestionDelay="500"
                    />
                }
                
                <QuoteBox 
                    width= "600px"
                    color={this.props.color}     
                    // quote={this.state.quote}
                    // author={this.state.author}
                    quote="I want some money! I am an american, murica fuck yeah!"
                    author="Stephen Hawking, Golden Eye"
                    search={true}
                    onClick={this.handleClick}
                />
            </this.Container>
        )
    }
}

export default QuotePage;