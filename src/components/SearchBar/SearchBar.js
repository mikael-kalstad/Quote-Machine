/* Search algorithm for suggestions is optional
* - Takes a getSuggestion method as a prop
* - Suggestions are stored in arrays in results in state.
* - Results format: [type, typeName, value]
*
* Minimum characters before update can also be assigned as a prop
* - Prop name: minCharactersBeforeUpdate, default is 0
*
* Delay between refreshing the suggestions can also be specified as a prop
* - Prop name: suggestion, default is 0
* - Useful to avoid too many request to server
*/

import React from 'react';
import './SearchBar.css';
import Suggestion from '../Suggestion';
import { getSuggestions } from './SearchAlg';

class SearchBar extends React.Component {
   constructor(props) {
       super();
       this.state = {
           inputValue: "",
           suggestions: {},
           timeout: false, 
           visibility: false
       }
   }

   updateSuggestions() {
        // Will only start giving suggestions after specified characters and if there is no timeout
        if (this.state.inputValue.length > this.props.minCharactersBeforeUpdate && !this.state.timeout) {
            this.setState({ timeout: true });
            console.log("getting results...")

            getSuggestions(this.state.inputValue)
            .then(data => this.setState({ suggestions: data}))

            // Potential delay to prevent too many API calls when typing, specified as a prop
            setTimeout(() => {this.setState({ timeout: false })}, this.props.suggestionDelay);
        }  
    }

   updateParent = (arr) => {
        if (arr === undefined || arr.length === 0) return false;
        this.clearSuggestions();

        this.setState({ inputValue: arr[arr.length-1], visibility: false });
        this.props.updateFilter(arr); // Parent function call
    }

    inputSubmit = (e) => {
        if (e.key === 'Enter') { this.updateParent([this.state.inputValue]) }
    }   

    onChange = (event) => {
        // Suggestions will not be updated before the setState is finished. 
        this.setState({ inputValue: event.target.value, visibility: true }, 
        () => {
            this.updateSuggestions()
            if (this.state.inputValue === "") {
                this.setState({ visibility: false });
            }
        })
    }

    clearInput = () => {
        this.setState({ inputValue: "", visibility: false });
        this.props.resetFilter(); 
    }

    clearSuggestions = () => this.setState({ suggestions: {} })

    showSuggestions = () => this.setState({ visibility: true })

    render() {
        return ( 
            <div id="search-container" style={this.props.containerStyle}>
                <div id="searchbar">
                    <input 
                        style={{  
                            borderRadius: !this.state.visibility ? "5px" : "5px 5px 0 0", 
                            borderBottom: "1px solid #999" 
                        }}
                        value={this.state.inputValue}
                        placeholder={this.props.placeHolder}
                        onChange={this.onChange}
                        onKeyPress={this.inputSubmit}
                    />

                    {/* Button for searching or clearing input */}
                    {this.state.inputValue === "" ? 
                        <button className="search-btn" style={{cursor: "default"}}>
                            <i className="fas fa-search"></i>
                        </button> 
                        :
                        <button className="search-btn" >
                            <i className="fas fa-times" onClick={this.clearInput}></i>
                        </button>
                    }
                </div>

                {this.state.visibility ?
                    <Suggestion 
                        id_ul="suggestions"
                        id_li="suggestion_li"
                        updateToSuggestion={this.updateParent}
                        results={this.state.suggestions}
                    />
                :null} 
            </div>
        )
    }
}

// Default values for props
SearchBar.defaultProps = {
    minCharactersBeforeUpdate: 0
}

export default SearchBar;