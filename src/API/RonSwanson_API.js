export default () => {
    return fetch('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(res => res.json())
    .then(data => [data[0], "Ron Swanson"]);
}