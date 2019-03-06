import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import StartMenu from './components/Pages/StartMenu';
import QuotePage from './components/Pages/QuotePage';
import CategoryData from './Categories.json';

// Adding icons from fontawsome 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft, faArrowAltCircleLeft, faSearch, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faQuoteLeft, faArrowAltCircleLeft, faSearch, faTimes, faSpinner);

// const Container = styled.div`
//   ::-webkit-scrollbar {
//     width: 10px; 
//     background-color: #F5F5F5;
//   }

//   /* The empty space “below” the progress bar. */
//   ::-webkit-scrollbar-track {
//     display: none;
//   }

//   /*  The draggable scrolling element resizes depending on the size of the scrollable element. */
//   ::-webkit-scrollbar-thumb {
//     background-color: #c0bebe;
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
    // Will only pick colors that have good contrast with white
    let hue = this.random(0, 360);
    let saturation = this.random(30, 100);
    let lightness = this.random(70, 80);

    return 'hsl('+hue+", "+saturation+"%, "+lightness+"%)";
  }
  
  random = (min, max) => Math.round(min + Math.random()*(max-min));
  updateColor = () => this.setState({ color: this.randomHSL() });

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