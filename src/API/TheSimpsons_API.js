export default () => {
    return fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
    .then(res => res.json())
    .then(data => [data[0]["quote"], data[0]["character"]])
}