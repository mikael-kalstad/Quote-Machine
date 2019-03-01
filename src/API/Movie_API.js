 export default (filter) => {
    if (filter !== undefined && filter.length !== 0) return getSpecificQuote(filter);
    return getRandomQuote();
 }
 
 // General method for both movie functions
 const updateMovieState = (data) => {
    if (data === undefined || data.length === 0) return false;
    let num = data.length > 1 ? random(0, data.length-1) : 0;
    
    return [
        data[num]["content"],
        data[num]["actor"]["name"] + ", " + data[num]["movie"]["title"]
    ]
}

const random = (min, max) => Math.round(min + Math.random()*(max-min));

// Will pick a random quote
const getRandomQuote = () => {
    return fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?random=1', {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => {
        if (res.ok) return res.json();
        else return Error(res.status);
    })
    .then(data => {
        if (data instanceof Error) return data;
        return updateMovieState(data)
    })
    .catch(err => console.log("error", err))
}

// Will get specific quotes based on the provided filter
const getSpecificQuote = (filter) => {  
    // Convert typename to valid typename in API call
    if (filter[0] === "Category") filter[0] = "categories";
    else if (filter[0] === "Quote") filter[0] = "content";
    else filter[0] = filter[0].toLowerCase();

    // Always the last in the array that needs to be lowercase with - between words
    filter[filter.length-1] = filter[filter.length-1].toLowerCase().trim().split(' ').join('-');

    let filterLink = "http://movie-quotes-app.herokuapp.com/api/v1/quotes?";
    filter.length === 1 ? filterLink += "multiple=" + filter[0] :
    filterLink += filter[0] + "=" + filter[1];

    return fetch (filterLink, {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => updateMovieState(data))
    .catch(err => console.log("error"))
}