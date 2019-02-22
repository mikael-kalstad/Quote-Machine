// Get random programming/code quote
export default getQuote = () => {
    let data = [];
    
    fetch('http://quotes.stormconsultancy.co.uk/random.json')
    .then(res => res.json())
    .then(data => {
        data[0] = data.quote;
        data[1] = data.author;
    })
    .catch(err => console.log("error"));

    return data;
}