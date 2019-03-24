import data from 'API/Inspiration_data.json';

export default (input, numOfSuggestions) => {
    console.log(getSuggestions(data, input, numOfSuggestions))
    return new Promise((resolve, reject) => {
        resolve(getSuggestions(data, input, numOfSuggestions));
    })
}

const getSuggestions = (data, input, numOfSuggestions) => {
    //Check for "empty"/undefined data
    if (data === undefined || !input || input === "") return false;
    let suggestions = {};

    const addSuggestion = (...args) => {
        if (checkForDuplicate(...args)) return false;
        suggestions[uniqueID(suggestions)] = [...args];
    }

    for (let i = 0; i < data.length; i++) {
        if (hasContent(input, data[i]["author"])) addSuggestion("Author", data[i]["author"]);
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;
        
        if (hasContent(input, data[i]["quote"])) addSuggestion("Quote", data[i]["quote"], data[i]["author"]);
        if (checkNumOfKeys(suggestions, numOfSuggestions)) return suggestions;
    }
    return suggestions;
}

/* Helper functions */

const checkNumOfKeys = (obj, maxLength) => Object.keys(obj).length >= maxLength;
const random = (min, max) => Math.round(min + Math.random()*(max-min));

const checkForDuplicate = (obj, ...args) => {
    for (let i in obj) {
      if (obj[i].toString() === [...args].toString()) return true;
    }
}

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
