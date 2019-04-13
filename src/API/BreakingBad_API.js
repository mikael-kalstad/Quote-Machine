export default () => {
    return fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes')
    .then(res => res.json()) 
    .then(data => {
        console.log("data", data)
        return [data[0]["quote"], data[0]["author"]]
        
    })
}