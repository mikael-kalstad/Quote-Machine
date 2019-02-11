import React, { Component } from 'react';
import QuoteBox from '../QuoteBox/QuoteBox';
import Icon from '../Icon';
import SearchBar from '../SearchBar/SearchBar';
import Anime from 'react-anime';

class QuotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            isLoading: false,
            movieFilter: []
        }
        // Initializer, get quote
        this.handleClick();
    }

    // Update method for button and search
    handleClick = ()  => {
        // Random delay to simulate differing API respond times    
        let delay = Math.random() * (600);
        this.setState({ isLoading: true });
    
        setTimeout(() => {
          this.props.updateColor();
        
          if (this.props.quoteCategory === "Programming") {
                this.getProgrammingQuote();
          } else if (this.state.movieFilter.length > 0) {
                this.getSpecificMovieQuote();
          } else if (this.props.quoteCategory === "Movie") {
                this.getMovieQuote();
          }
        }, delay);
      }

    // Method that child will call to update moviefilter
    updateFilter = (arr) => {
        if (arr === undefined) return undefined;
        if (arr[0] === "content") this.setState({ quote: arr[2], author: arr[3]+', '+arr[4] });
        else {
            // Always the last in the array that needs to be lowercase with - between words
            arr[arr.length-1] = arr[arr.length-1].toLowerCase().trim().split(' ').join('-');
            
            this.setState({ movieFilter: arr });
            this.handleClick(); // Update the quote with the moviefilter applied
        }
    }

    resetFilter = () => this.setState({ movieFilter: [] })

    // General method for updating movies state, used by several methods.
    updateMovieState = (data) => {
        if (data === undefined || data.length === 0) return false;
        let num = data.length > 1 ? this.random(0, data.length-1) : 0;
        console.log("num",num)
        this.setState({
            quote: data[num]["content"],
            author: data[num]["actor"]["name"] + ", " + data[num]["movie"]["title"],
            isLoading: false
        })
    }

    random = (min, max) => Math.round(min + Math.random()*(max-min));

    // Random programming quote
    getProgrammingQuote = () => {
        fetch('http://quotes.stormconsultancy.co.uk/random.json')
        .then(res => res.json())
        .then(data => {
            this.setState({
                quote: data.quote,
                author: data.author,
                isLoading: false
            })
        })
        .catch(err => console.log("error"))
    }

    // Will pick random quotes
    getMovieQuote = () => {
        fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?random=1', {
        headers: {
            "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
        }})
        .then(res => res.json())
        .then(data => this.updateMovieState(data))
        .catch(err => console.log("error"))
    }

    // Will get specific quotes based on moviefilter
    getSpecificMovieQuote = () => {  
        console.log("filter", this.state.movieFilter); 
        
        let filterLink = "http://movie-quotes-app.herokuapp.com/api/v1/quotes?";
        this.state.movieFilter.length === 1 ? filterLink += "multiple="+this.state.movieFilter[0] :
        filterLink += this.state.movieFilter[0]+"="+this.state.movieFilter[2];
        
        console.log("link", filterLink);  
        fetch (filterLink, {
        headers: {
            "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
        }})
        .then(res => res.json())
        .then(data => this.updateMovieState(data))
        .catch(err => console.log("error"))
    }

    render() {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "grid",
                    gridTemplateRows: this.props.quoteCategory === "Movie" ? "auto 60px 1fr" : "auto 1fr",
                }}
            >
                <h1 className="title"
                    style={{textAlign: "center", color: "white", fontSize: "50px"}}
                > {this.props.quoteCategory} Quotes</h1>
                
                <Icon 
                    id="goBack"
                    link=""
                    classNameI="fas fa-chevron-circle-left"
                    classNameA="icon-goBack"
                />

                {this.props.quoteCategory === "Movie"? 
                <SearchBar 
                    containerStyle={{width: "400px"}}
                    updateFilter={this.updateFilter}
                    resetFilter={this.resetFilter}
                    placeHolder="James Bond..."
                    // minCharactersBeforeUpdate="2"
                    suggestionDelay="500"
                /> : null}
                

                {/* <Anime
                    easing='easeInOutElastic'
                    delay={400}
                    duration={1000}
                    loop={true}
                    translateX={100}
                > */}
                    <QuoteBox 
                        width= "600px"
                        color={this.props.color}     
                        quote={this.state.quote}
                        author={this.state.author}
                        onClick={this.handleClick}
                        isLoading={this.state.isLoading}
                    />
 
                {/* </Anime> */}
            </div>
        )
    }
}

export default QuotePage;