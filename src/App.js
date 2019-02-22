import React, { Component } from 'react';
import styled, {createGlobalStyle} from 'styled-components';

import StartMenu from './components/Pages/StartMenu';
import QuotePage from './components/Pages/QuotePage';
import Categories from './Categories.json';
import movieLogo from './img/movie.png';
import terminal from './img/terminal.png';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
    font-family: 'Abril Fatface', sans-serif;
  }
`

class App extends Component {
  constructor() {
    super();
    this.state = {
      quoteCategory: "",
      color: "black",
    }
  }

  setQuoteCategory= (category) => this.setState({ quoteCategory: category });

  // Will find appropriate HSL color and return it
  randomHSL= () => {
    let random = (min, max) => Math.round(min + Math.random()*(max-min));

    // Only pick color that have good contrast with white
    let hue = random(0, 360);
    let saturation = random(30, 100);
    let lightness = random(70, 80);

    return 'hsl('+hue+", "+saturation+"%, "+lightness+"%)";
  }

  updateColor = () => this.setState({ color: this.randomHSL() });

  goBack = () => this.setState({ quoteCategory: "" });

  categoryNames = ["Movie", "Programming", "Movie", "Programming"];
  categoryLogos = [movieLogo, terminal, movieLogo, terminal, movieLogo, terminal];


  render() {    
    return (
      <>
        {(this.state.quoteCategory === "") ? 
            <StartMenu 
              categoryNames={this.categoryNames}
              categoryLogos={this.categoryLogos}
              onClick={this.setQuoteCategory}
              quoteCategories={this.quoteCategories}
            /> 
          :
            <QuotePage 
              color={this.state.color}
              updateColor={this.updateColor}
              quoteCategory={this.state.quoteCategory}
            />
        }
      </>
    );
  }
}

export default App;