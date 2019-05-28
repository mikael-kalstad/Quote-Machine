import React, { Component } from 'react';
import styled from 'styled-components';

import QuoteBox from '../QuoteBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../Search/SearchBar';
import RateLimiterWarning from '../RateLimiterWarning';
import ControlsHint from '../ControlsHint';
import WarningDialog from '../WarningDialog';

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
            rateLimit: false,
            controlsHint: false,
            numOfQuotesFound: 0,
            warning: false,
            warningCountdown: false
        }
    }

    componentDidMount() {
        // Find where the modules are located, path-data stored in props.categoryData
        // Syntax: [API_MODULE, SEARCH_MODULE (optional), Search_placeholder (optional)]
        let categoryDataFiltered = this.getCategoryData();
        
        // Error msg if api_module is not defined
        if (categoryDataFiltered.length === 0) {
            console.log("Error, api_module must be defined in categorydata. Check if api_module in Categories.json is defined.");
        }

        // Api-module
        if (categoryDataFiltered.length >= 1) {
            import('../../' + categoryDataFiltered[0])
            .then(module => {
                this.setState({ api_module: module }, () => this.updateContent());
            })
        }

        // Search-module
        if (categoryDataFiltered.length >= 2) {
            import('../../' + categoryDataFiltered[1])
            .then(module => {
                this.setState({ search_module: module })
            })
        }

        // Search-placeholder
        if (categoryDataFiltered.length >= 3) {
            this.setState({ search_placeholder: categoryDataFiltered[2] })
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


        // Control hints 
        let hintShowDelay = 10000;
        let hintHiddenDelay = 6000;
    
        setTimeout(() => {
            this.setState({ controlsHint: true });
        }, hintShowDelay) 

        setTimeout(() => {
            this.setState({ controlsHint: false })
        }, hintHiddenDelay + hintShowDelay)
    }

    getCategoryData = () => {
        let categoryDataFiltered = [];
        let data = this.props.categoryData;
        const  checkForKey = (obj, keyName) => obj.hasOwnProperty(keyName);

        for (let i = 0; i < data.length; i++) {
            if (checkForKey(data[i], "name") && data[i]["name"] === this.props.categoryName) {
                categoryDataFiltered.push(data[i]["api_function"]);
                
                if (checkForKey(data[i], "search_algorithm")) {
                    categoryDataFiltered.push(data[i]["search_algorithm"]);

                    if (checkForKey(data[i], "search_placeholder")) {
                        categoryDataFiltered.push(data[i]["search_placeholder"]);
                    }
                }
            }
        }
        return categoryDataFiltered;
    }
    
    // Update method for handling click and search
    updateContent = ()  => {
        let snailDelay = 5000;
        let warningDelay = 5000;

        if (!this.state.warningCountdown) {
            this.setState({ warningCountdown: true });

            setTimeout(() => {
                if (this.state.quote == "" || this.state.quote == null) 
                    this.setState({ warning: true });

                    this.setState({ warningCountdown: false });
            }, warningDelay) 
        }

        // Should not update if ratelimiter timeout is active
        if (!this.state.rateLimit) {
            this.props.updateColor();

            // Fetch data from api_module
            this.state.api_module.default(this.state.filter)
            .then(data => {
                // Check if error is thrown in the api_function
                if (data instanceof Error && data.message == 429) {
                    this.setState({ rateLimit: true })

                    // Snail/warning will dissapear after delay
                    setTimeout(() => {
                        this.setState({ rateLimit: false })
                    }, snailDelay)
                }
                
                // Update quote with data received
                else this.setState({ quote: data[0], author: data[1], numOfQuotesFound: data[2] });
            })
        }
    }

    // Method to update filter, can be used by a child component with search functionality
    updateFilter = (arr) => {
        if (arr == 'undefined' || arr.length === 0) return false;
        
        // If the filter is a quote, just render the quote directly
        if (arr[0] === "Quote") {
            this.setState({ quote: arr[1], author: arr[2] + ', ' + arr[3] });
            this.resetFilter();
            this.props.updateColor();
        } else {
            // Update  with the filter applied, after state is updated
            this.setState({ filter: arr }, () => this.updateContent());
        }   
    }

    resetFilter = () => this.setState({ filter: [] })

    // Check for touch device
    isTouchDevice = () => 'ontouchstart' in document.documentElement;

    goToMenu = () => this.props.setCategoryName("");
    
    Container = styled.div`
        height: 100vh;
        background-color: ${props => props.color};
        transition: all 1s linear;
        display: grid;
        grid-template-rows: ${search => {
            if (this.state.search_module && this.state.filter.length > 0) {
                return "auto 60px 20px 1fr"
            } else if (this.state.search_module) {
                return "auto 60px 1fr"
            } else {
                return "auto 1fr"
            }
        }};
    `

    Title = styled.h1`
        font-weight: 600;
        text-align: center;
        color: white;
        font-size: 50px;
        text-shadow: 4px 4px 1px rgba(0,0,0,0.2);

        @media screen and (max-width: 700px) {
            margin-top: 120px;
        }
    `
    ResultText = styled.p`
        font-size: 20px;
        text-align: center;
        color: white;
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
                
                <this.Back onClick={this.goToMenu}>
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

                {this.state.filter.length > 0 && 
                    <this.ResultText>Number of results found: {this.state.numOfQuotesFound}</this.ResultText>
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
                
                {/* Only render controls hint if user is not on touch device*/}
                {!this.isTouchDevice() && this.state.controlsHint &&
                    <ControlsHint />
                }
                
                {this.state.warning &&
                     <WarningDialog
                        title="Data warning"
                        text="No data found, please try another category"
                        actionMsg="Menu"
                        action={this.goToMenu}
                        cancelMsg="Close"
                        cancelAction={() => this.setState({ warning: false })}
                        show={this.state.warning}
                     >
                     </WarningDialog>
                }
            </this.Container>
        )
    }
}

export default QuotePage;