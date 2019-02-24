import React, { Component } from 'react';
// import styled, {createGlobalStyle} from 'styled-components';

import StartMenu from './components/Pages/StartMenu';
import QuotePage from './components/Pages/QuotePage';
import CategoryData from './Categories.json';

// Adding icons from fontawsome 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faQuoteLeft, faArrowAltCircleLeft);

// const GlobalStyles = createGlobalStyle`
//   body {
//     @import url('https://fonts.googleapis.com/css?family=Abril+Fatface');
//     font-family: 'Abril Fatface', sans-serif;
//   }
// `

class App extends Component {
  constructor() {
    super();
    this.state = {
      categoryName: "",
      color: this.randomHSL(),
    }
  }

  setCategoryName = (category) => this.setState({ categoryName: category });

  // Will find appropriate HSL color
  randomHSL = () => {
    let random = (min, max) => Math.round(min + Math.random()*(max-min));

    // Will only pick colors that have good contrast with white
    let hue = random(0, 360);
    let saturation = random(30, 100);
    let lightness = random(70, 80);

    return 'hsl('+hue+", "+saturation+"%, "+lightness+"%)";
  }

  updateColor = () => this.setState({ color: this.randomHSL() });

  // goBack = () => this.setState({ categoryName: "" });

  checkForKey = (obj, keyName) => obj.hasOwnProperty(keyName);

  render() {    
    return (
      <>
        {(this.state.categoryName === "") ? 
            <StartMenu 
              categoryData={CategoryData}
              onClick={this.setCategoryName}
              quoteCategories={this.quoteCategories}
            /> 
          :
            <QuotePage 
              setCategoryName={this.setCategoryName}
              color={this.state.color}
              updateColor={this.updateColor}
              categoryData={CategoryData}
              categoryName={this.state.categoryName}
            />
        }
      </>
    );
  }
}

export default App;