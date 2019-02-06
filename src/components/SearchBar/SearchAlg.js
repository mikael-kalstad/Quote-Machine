// Fetch movie data with the "multiple" API call 
export const getSuggestions = (input) => {
    return fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?multiple='+input, {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => checkForSuggestions(data, input))
}

const checkForSuggestions = (data, input) => {
    //Check for "empty"/undefined data
    if (data === undefined || !input || input === "") return undefined;
  
    let suggestions = {};
    const addSuggestion = (...args) => suggestions[uniqueID(suggestions)] = [...args];

    if (isYear(input)) addSuggestion("years", "Year", input);

    // Find 6 suggestions in data 
    for (let i = 0; i < data.length; i++) {
        if (hasContent(input, data[i]["actor"]["name"])) {
            addSuggestion("actor", "Actor", data[i]["actor"]["name"]);
         } 
         let randomNum = random(0, (data[i]["categories"].length)); // Used for category
         if (hasContent(input, data[i]["categories"][randomNum])) {
             addSuggestion("categories", "Category", data[i]["categories"][randomNum]);
         }
         if (hasContent(input, data[i]["content"])) {
            addSuggestion("content", "Quote", data[i]["content"]);
         }
         if (hasContent(input, data[i]["character"]["name"])) {
            addSuggestion("character", "Character", data[i]["character"]["name"]);
         }
         if (hasContent(input, data[i]["movie"]["title"])) {
            addSuggestion("movie", "Movie", data[i]["movie"]["title"]);
         }
        if (Object.keys(suggestions).length >= 6) break;
    } 
    return suggestions
}

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
