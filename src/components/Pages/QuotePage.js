import React, { Component } from 'react';
import styled from 'styled-components';

import QuoteBox from '../QuoteBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SearchBar from '../Search/SearchBar';

class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            filter: [],
            api_module: null,
            search_module: null
        }
    }

    componentDidMount() {
        // Find where the modules are located, path-data stored in props.categoryData
        let paths = this.getFunctionPaths();
        console.log(paths)
        // Api-module
        if (paths.length >= 1) {
            import('../../' + paths[0])
            .then(module => {
                this.setState({ api_module: module }, () => this.updateContent());
            })
        }

        // Search-module
        if (paths.length >= 2) {
            import('../../' + paths[1])
            .then(module => {
                this.setState({ search_module: module })
            })
        }
    }

    getFunctionPaths = () => {
        let paths = [];
        let data = this.props.categoryData;

        for (let i = 0; i < data.length; i++) {
            if (this.checkForKey(data[i], "name") && data[i]["name"] === this.props.categoryName) {
                paths.push(data[i]["api_function"]);
                
                if (this.checkForKey(data[i], "search_algorithm")) {
                    paths.push(data[i]["search_algorithm"]);
                }
            }
        }
        return paths;
    }

    checkForKey = (obj, keyName) => obj.hasOwnProperty(keyName);
    
    // Update method for handling click and search
    updateContent = ()  => {
        this.props.updateColor();

        this.state.api_module.default(this.state.filter)
        .then(data => this.setState({ quote: data[0], author: data[1]}));
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
                        placeHolder="James Bond..."
                        // minCharactersBeforeUpdate="2"
                        numOfSuggestions={6}
                        suggestionDelay="500"
                    />
                }
                
                <QuoteBox 
                    width= "600px"
                    color={this.props.color}     
                    quote={this.state.quote}
                    author={this.state.author}
                    search={true}
                    onClick={this.updateContent}
                />
            </this.Container>
        )
    }
}

export default QuotePage;