import React from 'react';
import QuoteBox from '../QuoteBox/QuoteBox';
import Icon from '../Icon';
import SearchBar from '../SearchBar/SearchBar';

class QuotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: "",
            author: "",
            isLoading: false,
            movieFilter: []
        }
        this.handleClick();
    }

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
    
    updateMovie = (arr) => {
        this.updateFilter(arr);
        this.handleClick();
    }

    updateFilter = (arr) => {
        if (arr[0] === undefined) return undefined;

        arr[2] = arr[2].toLowerCase().trim().split(' ').join('-');
    
        this.setState({ movieFilter: arr });
        this.handleClick();
    }

    resetFilter = () => this.setState({ movieFilter: [] })

    updateMovieState = (data) => {
        if (data.length === 0 || data === undefined) return false;
        let num = data.length > 1 ? this.random(0, data.length-1) : 0;
        
        this.setState({
            quote: data[num]["content"],
            author: data[num]["actor"]["name"] + ", " + data[num]["movie"]["title"],
            isLoading: false
        })
    }

    random = (min, max) => Math.round(min + Math.random()*(max-min));

    getProgrammingQuote = () => {
        fetch('http://quotes.stormconsultancy.co.uk/random.json')
        .then(res => res.json())
        .then(data => {
            this.setState({
                quote: data.quote,
                author: data.author,
                isLoading: false
            })
        });
    }

    getMovieQuote = () => {
        fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?random=1', {
        headers: {
            "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
        }})
        .then(res => res.json())
        .then(data => this.updateMovieState(data))
    }

    getSpecificMovieQuote = () => {  
        console.log("filter", this.state.movieFilter); 
        
        let filterLink = 'http://movie-quotes-app.herokuapp.com/api/v1/quotes?';
        
        filterLink += this.state.movieFilter[0]+"="+this.state.movieFilter[2];
        
        console.log("link", filterLink);  
        fetch (filterLink, {
        headers: {
            "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
        }})
        .then(res => res.json())
        .then(data => this.updateMovieState(data))
    }

    render() {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "grid",
                    gridTemplateRows: "auto 60px 1fr",
                    // alignItems: "center"
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
                /> : null}

                <QuoteBox 
                    width= "600px"
                    color={this.props.color}     
                    quote={this.state.quote}
                    author={this.state.author}
                    onClick={this.handleClick}
                    isLoading={this.state.isLoading}
                />
            </div>
        )
    }
}

export default QuotePage;