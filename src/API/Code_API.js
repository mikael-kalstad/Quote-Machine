// Get random programming/code quote
export default () => {
    return fetch('http://quotes.stormconsultancy.co.uk/random.json')
    .then(res => res.json())
    .then(data => [data["quote"], data["author"]])
    .catch(err => console.log("error"));
}