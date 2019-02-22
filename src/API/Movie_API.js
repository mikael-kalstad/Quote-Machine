 export default handleRequest = (filter) => {
    if (filter != [] || filter != undefined) getSpecificQuote();
    getRandomQuote();
 }
 
 // General method for both movie functions
 const updateMovieState = (data) => {
    if (data === undefined || data.length === 0) return false;
    let num = data.length > 1 ? this.random(0, data.length-1) : 0;
    
    let data = [];
    data[0] = data[num]["content"];
    data[1] = data[num]["actor"]["name"] + ", " + data[num]["movie"]["title"];

    return data;
}

// Will pick a random quote
const getRandomQuote = () => {
    fetch('http://movie-quotes-app.herokuapp.com/api/v1/quotes?random=1', {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => this.updateMovieState(data))
    .catch(err => console.log("error"))
}

// Will get specific quotes based on the provided filter
const getSpecificQuote = (filter) => {  
    let filterLink = "http://movie-quotes-app.herokuapp.com/api/v1/quotes?";
    filter.length === 1 ? filterLink += "multiple=" + filter[0] :
    filterLink += filter[0] + "=" + filter[2];
 
    fetch (filterLink, {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => this.updateMovieState(data))
    .catch(err => console.log("error"))
}