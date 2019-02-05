import React from 'react';
import './SearchBar.css';
import Suggestion from '../Suggestion';

class SearchBar extends React.Component {
   constructor(props) {
       super();
       this.state = {
           inputValue: "",
           results: {},
           timeout: false, 
           visibility: false
       }
   }

   updateParent = (suggestionArr) => {
       console.log("update parent..",suggestionArr);
        if (suggestionArr === [] || suggestionArr === undefined) return false;
        this.setState({ inputValue: suggestionArr[1], visibility: false });
        this.clearSuggestions();
        this.props.updateFilter(suggestionArr); // Parent function call
   }

    inputSubmit = (e) => {
        if (e.key === 'Enter') { this.updateParent([this.state.inputValue]); }
    }   

   onChange = (event) => {
       // Notice that suggestions are not updated before setState is finished updating the state
        this.setState({ inputValue: event.target.value, visibility: true },
            () => {
                if (this.isYear(this.state.inputValue)) {
                    this.update("Year", this.state.inputValue);
                } else if (this.state.inputValue.length >= 2 && !this.state.timeout) {
                    this.setState({ timeout: true })
                    this.getSuggestionData(this.state.inputValue)
                    // Small delay to prevent too many API calls.
                    setTimeout(() => {this.setState({ timeout: false })}, 500);
                }  
            })
   }

    clearInput = () => this.setState({ inputValue: "", visibility: false });

    clearSuggestions = () => this.setState({ results: {} });

    showSuggestions = () => this.setState({ visibility: true })

    update = (type, value) => {
        if (value.length > 30) value = value.slice(0, 30) + "...";
        
        for (let i in this.state.results) {
            if (this.state.results[i][1] === value) return false;
        } 

        this.setState(prevState => ({
            results: {
                ...prevState.results,
                [this.uniqueID()]: [type, value]
            }
        }));
    }

    updateSuggestions = (data, input) => {
        this.clearSuggestions();
    
        //Check for "empty"/undefined data
        if (data.length === 0 || data === undefined
            || !input || input === "") return undefined;
        
        // Check if content exist in text
        const hasContent = (text, comparison) => {
            let regex = new RegExp(text, 'ig');
            return regex.test(comparison)
        }
      
        // Give 6 top results as suggestion
        for (let i = 0; i < data.length; i++) {
            if (hasContent(input, data[i]["actor"]["name"])) {
                this.update("Actor", data[i]["actor"]["name"]);
            } 
            let randomNum = this.random(0, 3); // Used for category
            if (hasContent(input, data[i]["categories"][randomNum])) {
                this.update("Category", data[i]["categories"][randomNum]);
            }
            if (hasContent(input, data[i]["content"])) {
                this.update("Quote", data[i]["content"]);
            }
            if (hasContent(input, data[i]["character"]["name"])) {
                this.update("Character", data[i]["character"]["name"]);
            }
            if (hasContent(input, data[i]["movie"]["title"])) {
                this.update("Movie", data[i]["movie"]["title"]);
            }
            if (Object.keys(this.state.results).length >= 6) break;
        }  
    }

    // -- Helper methods for updateSuggestions -- 
    random = (min, max) => Math.round(min + Math.random()*(max-min));
    isYear = input => /^\d{4}$/.test(input);
    
    // Give each key a unique id to prevent overwriting content
    uniqueID = () => {
        let id = this.random(0, 36);
        for (let key in this.state.results) {
            if (id === key) this.uniqueID();
        }
        return id;
    }

    // Fetch movie data with the "multiple" API call 
    getSuggestionData = (input) => {
        fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?multiple='+input, {
        headers: {
            "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
        }})
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.updateSuggestions(data, input)})
    }

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
                        placeholder="Search for.. James Bond"
                        onChange={this.onChange}
                        onKeyPress={this.inputSubmit}
                    />

                    {/* Button for searching or clearing input */}
                    {this.state.inputValue === "" ? 
                    <button className="search-btn" style={{cursor: "default"}}><i className="fas fa-search"></i></button> :
                    <button className="search-btn" ><i className="fas fa-times" onClick={this.clearInput}></i></button>}
                </div>

                {this.state.visibility ?
                    <Suggestion 
                        id_ul="suggestions"
                        id_li="suggestion_li"
                        updateToSuggestion={this.updateParent}
                        results={this.state.results}
                    />
                :null} 
            </div>
        )
    }
}

export default SearchBar;