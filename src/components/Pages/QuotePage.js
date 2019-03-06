import React, { Component } from 'react';
import styled from 'styled-components';

import QuoteBox from '../QuoteBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../Search/SearchBar';
import RateLimiterWarning from '../RateLimiterWarning';
import ControlsHint from '../ControlsHint';
import Anime from 'react-anime';

class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            filter: [],
            api_module: null,
            search_module: null,
            search_placeholder: "Search for...",
            updateTimeOut: false,
            rateLimiterCount: 0,
            rateLimit: false
        }
    }

    componentDidMount() {
        // Find where the modules are located, path-data stored in props.categoryData
        // Syntax: [API_MODULE, SEARCH_MODULE (optional), Search_placeholder (optional)]
        let filterData = this.getCategoryData();
        
        // Error msg if api_module is not defined
        if (filterData.length === 0) {
            console.log("Error, api_module must be defined in categorydata. Check Categories.json if api_module is defined.");
        }

        // Api-module
        if (filterData.length >= 1) {
            import('../../' + filterData[0])
            .then(module => {
                this.setState({ api_module: module }, () => this.updateContent());
            })
        }

        // Search-module
        if (filterData.length >= 2) {
            import('../../' + filterData[1])
            .then(module => {
                this.setState({ search_module: module })
            })
        }

        // Search-placeholder
        if (filterData.length >= 3) {
            this.setState({ search_placeholder: filterData[2] })
        }

        // Adding key listener for Enter and Space, will update quote
        let down = false; // Prevent repeating updates!

        document.addEventListener("keydown", (e) => {
            // Note: key " " is spacebar
            if (!down && (e.key === "Enter" || e.key === " ")) {
                down = true;
                this.updateContent();
            }
        }, false);

        // After key is up, it can update again if key is pressed
        document.addEventListener("keyup", (e) => down = false);
    }

    getCategoryData = () => {
        let filterData = [];
        let data = this.props.categoryData;
        const  checkForKey = (obj, keyName) => obj.hasOwnProperty(keyName);

        for (let i = 0; i < data.length; i++) {
            if (checkForKey(data[i], "name") && data[i]["name"] === this.props.categoryName) {
                filterData.push(data[i]["api_function"]);
                
                if (checkForKey(data[i], "search_algorithm")) {
                    filterData.push(data[i]["search_algorithm"]);

                    if (checkForKey(data[i], "search_placeholder")) {
                        filterData.push(data[i]["search_placeholder"]);
                    }
                }
            }
        }
        return filterData;
    }
    
    // Update method for handling click and search
    updateContent = ()  => {
        let snailDelay = 5000;

        // Should not update if timeout is active
        if (this.state.rateLimiterCount < 4) {
            this.props.updateColor();

            this.state.api_module.default(this.state.filter)
            .then(data => {
                // If error is thrown in the api_function
                if (data instanceof Error) {
                    if (data.message == 429) {
                        this.setState({ rateLimit: true })

                        // Snail/warning will dissapear after delay
                        setTimeout(() => {
                            this.setState({ rateLimit: false })
                        }, snailDelay)
                    }
                }

                else this.setState({ quote: data[0], author: data[1]});
            })
        }

        // Timeout to prevent to frequently updating
        let updateTimeOutDelay = 5000;
        
        // setTimeout(() => {
        //     this.setState({ rateLimiterCount: 0 })
        // }, updateTimeOutDelay)

        // this.setState(prevState => ({ rateLimiterCount: prevState.rateLimiterCount + 1 }));
        // console.log("count", this.state.rateLimiterCount)
    }

    // Method to update filter, likely used by a child component with search functionality
    updateFilter = (arr) => {
        if (arr === undefined || arr.length === 0) return false;
        
        // If the filter is a quote, just render the quote directly
        if (arr[0] === "Quote") {
            this.setState({ quote: arr[1], author: arr[2] + ', ' + arr[3] });
            this.resetFilter();
            this.props.updateColor();
        } else {
            this.setState({ filter: arr }, () => {
                this.updateContent(); // Update  with the filter applied, after state is updated
            })
        }   
    }

    resetFilter = () => this.setState({ filter: [] })
    
    Container = styled.div`
        height: 100vh;
        background-color: ${props => props.color};
        transition: all 1s linear;
        display: grid;
        grid-template-rows: ${search => this.state.search_module ? "auto 60px 1fr" : "auto 1fr"};
    `

    Title = styled.h1`
        font-family: Helvetica, sans-serif;
        font-weight: 100;
        text-align: center;
        color: white;
        font-size: 50px;
    `
    Back = styled.div`
        cursor: pointer;
        color: white;
        font-size: 50px;
        position: absolute;
        padding: 30px;
    `

    WarningWrapper = styled.div`
        position: absolute;
        width: 300px;
        bottom: 0;
        right: 0;
    `

    render() {
        return (
            <this.Container color={this.props.color}>
                <this.Title> {this.props.categoryName} Quotes</this.Title>
                
                <this.Back onClick={() => this.props.setCategoryName("")}>
                    <FontAwesomeIcon icon="arrow-alt-circle-left" />
                </this.Back>

                {/* Searchbar will only render if search-module is defined */}
                {this.state.search_module !== null && 
                    <SearchBar 
                        search_module={this.state.search_module}
                        containerStyle={{width: "400px"}}
                        updateFilter={this.updateFilter}
                        resetFilter={this.resetFilter}
                        placeHolder={this.state.search_placeholder}
                        // minCharactersBeforeUpdate="2"
                        numOfSuggestions={6}
                        suggestionDelay="400"
                    />
                }
                
                <QuoteBox 
                    width="600px"
                    color={this.props.color}     
                    quote={this.state.quote}
                    author={this.state.author}
                    onClick={this.updateContent}
                />
                
                {this.state.rateLimit &&
                    <this.WarningWrapper>
                        <RateLimiterWarning />
                    </this.WarningWrapper>
                }
                
                <ControlsHint />
            </this.Container>
        )
    }
}

export default QuotePage;