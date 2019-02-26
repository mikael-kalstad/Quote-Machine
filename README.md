> ## Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
>
> -John F. Woods, 1991


# What I have learned

- React (JSX, state, components, props, child-parent relationship)
- NPM
- Javascript ES6 syntax (class, arrow function, spread operator)
- GIT (integration with VSC, GitHub)
- API calls (using fetch in js)
- JSON (access data with different formats)
- Search Algorithm (with data from API)

## Structure

This application is structured and developed to be able to easily add new content. The important data is stored in Categories.json. A category-name, path to category-logo, path to api-function and a path to a search-function can be provided. The search-function is optional, but name, logo and api-function is required for the category to be rendered. The api and search function should return a promise with an array with the quote-content.

### How to add a category

1. Add name, path to logo, path to api-function and path to search-algorithm (optional) in the `Categories.json` located `/src`. See example below:
```json
[
    {
        "name": "Movie",
        "logo": "logos/movie.png",
        "api_function": "API/Movie_API",
        "search_algorithm": "Search Algorithm/Movie_searchAlg"
    },
]
```
Thats it. Just make sure the path is right, in the example above the path is absolute within `/src`.

### API function

The application expects the api function to return a promise. The value of the promise should be an array with this syntax:
```javascript
["quote", "author"]
// Example
["", ""]
```

The function will have a filter as a parameter, but this will only have a value if the search algorithm is implemented within the same category. If so, it is expected that the API will be able to find content with provided information. Learn more about what information is included in the filter below.

### Search algorithm

The `Searchbar` component will use the search algorithm if it is provided. Note this component will not render if this function is not declared in `Categories.json`. The algorithm will be provided with a `inputvalue` and `number of suggestions`, which limits the number of suggestions that the searchbar will provide at the time. There are 6 different types of content that can be used.

- Year
- Category
- Actor
- Character
- Movie
- Quote

The search algorithm must return an array of suggestions wrapped in an object.

```javascript
{
  ["type", "content"]
}
// Example
{
  ["Character", "James Bond"],
  ["Movie", "Jaws"],
  ["Year", 2005]
}
```
#### Filter

The results from the search algorithm will work as a filter. This filter will be passed to the api function so it can find content based on this filter. 

Therefore if a suggestion is choosed it will act as a filter for every new quote that is requested. E.g if "James Bond (Character)" is choosed in the suggestions each time a `New Quote` is pressed, only quotes with "James Bond" as a character will be displayed. This filter can be reset by using the "exit "icon in the searchbar. Other inputs in the search bar that is searched with the `enter` key, will act as a more general filter without the type specified. 


## Color on quote page

The background color of the quote page is changed each time a new quote is requested.  The excact value of the color is specified in HSL (hue, saturation, lightness). To ensure that the color has good contrast with the other elements, which are white, I have made a function that will randomly select an appropriate color.  By using these values for hue, saturation and lightness, the color has good contrast with white and is also "colorful".    

- **Hue** 0 - 360 (all colors)
- **Saturation** 30 - 100 (avoid low saturation to give more color to the site)
- **Lightness** 70 - 80 (avoid too low lightness to give good contrast, and too high to avoid dark colors)


## Animation

For animations in this project I have used a package based on the popular animation library `anime.js` called `react-anime`. 

Usage
```javacsript
import Anime from 'react-anime'

<Anime ...animeProps>
  <SomeComponent>
<Anime>

```
Animeprops will take props the same way as anime.js does. This package provides a component that can be wrapped around other components for easily making animations. Documentation about anime.js can be found here: https://animejs.com/documentation/


## API's

Documentation about the API's I used for the quotes can be found in these links.

**Programming Quotes**: http://quotes.stormconsultancy.co.uk/api

**Movie Quotes**: https://juanroldan.com.ar/movie-quotes-api/#introduction
