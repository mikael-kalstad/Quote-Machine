import React, { Component } from 'react';
import './App.css';

import StartMenu from './components/Pages/StartMenu';
import QuotePage from './components/Pages/QuotePage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quoteCategory: "",
      color: this.randomHSL(),
      info_visibility: false,
    }
  }

  // HELLO 
  num = 2;

  setQuoteCategory= (category) => this.setState({ quoteCategory: category });

  updateColor = () => this.setState({ color: this.randomHSL() });

  goBack = () => this.setState({ quoteCategory: "" });

  // Will find appropriate HSL color and return it
  randomHSL= () => {
    let random = (min, max) => Math.round(min + Math.random()*(max-min));

    // Only pick color that have good contrast with white
    let hue = random(0, 360);
    let saturation = random(30, 100);
    let lightness = random(70, 80);

    return 'hsl('+hue+", "+saturation+"%, "+lightness+"%)";
  }

  render() {    
    const wrapper_style = { 
      backgroundColor: this.state.color, 
      transition: "all 0.6s"
    }

    return (
      <div id="wrapper" style={wrapper_style}>
        {(this.state.quoteCategory === "") ? 
            <StartMenu 
              color={this.state.color}
              onClick={this.setQuoteCategory}
            /> 
          :
            <QuotePage 
              color={this.state.color}
              updateColor={this.updateColor}
              quoteCategory={this.state.quoteCategory}
            />
        }
      </div>
    );
  }
}

export default App;