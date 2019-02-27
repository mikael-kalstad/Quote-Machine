// Fetch movie data with the "multiple" API call 
export default (input, numOfSuggestions) => {
    return fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?multiple='+input, {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => checkForSuggestions(data, input, numOfSuggestions))
}

const checkForSuggestions = (data, input, numOfSuggestions) => {
    //Check for "empty"/undefined data
    if (data === undefined || !input || input === "") return false;
  
    let suggestions = {};

    // Returns true if duplicate is found in suggestions
    const checkForDuplicate = (...args) => {
        for (let i in suggestions) {
          if (suggestions[i].toString() === [...args].toString()) return true;
        } return false;
    }
    
    const addSuggestion = (...args) => {
        if (checkForDuplicate(...args)) return false;
        suggestions[uniqueID(suggestions)] = [...args];
    }

    if (isYear(input)) addSuggestion("years", "Year", input);
    
    /* 
    The different types of content that can be searched for.
    - Syntax: [Typename, path to the actual value in data]
    - Special syntax for Quotes: [Typename, path to quote, path to actor(author), path to movietitle] 
    */

    // Find suggestions in data, number of suggestions limited to numOfSuggestions variable
    for (let i = 0; i < data.length; i++) {
        if (hasContent(input, data[i]["actor"]["name"])) {
            addSuggestion("Actor", data[i]["actor"]["name"]);
        } 
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;

        let randomNum = random(0, (data[i]["categories"].length)); // Used for category
        if (hasContent(input, data[i]["categories"][randomNum])) {
             addSuggestion("Category", data[i]["categories"][randomNum]);
        }
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;

        if (hasContent(input, data[i]["content"])) {
            addSuggestion("Quote", data[i]["content"], data[i]["actor"]["name"], data[i]["movie"]["title"]);
        }
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;
        
        if (hasContent(input, data[i]["character"]["name"])) {
            addSuggestion("Character", data[i]["character"]["name"]);
        }
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;
         
        if (hasContent(input, data[i]["movie"]["title"])) {
            addSuggestion("Movie", data[i]["movie"]["title"]);
        }
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;
    } 
    return suggestions;
}

const checkNumOfKeys = (obj, maxLength) => Object.keys(obj).length >= maxLength;
const random = (min, max) => Math.round(min + Math.random()*(max-min));
const isYear = input => /^\d{4}$/.test(input);

// Check if content exist in text
const hasContent = (text, content) => {
    let regex = new RegExp(text, 'ig');
    return regex.test(content);
}

// Give each key a unique id to prevent overwriting content
const uniqueID = (obj) => {
    let id = random(0, 36);
    for (let key in obj) if (id === key) this.uniqueID(); // Recursive
    return id;
}
