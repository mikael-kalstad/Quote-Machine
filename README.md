> ## Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.
>
> -John F. Woods, 1991


# What I have learned

- React (JSX, state, components, props, child-parent relationship)
- NPM pacakages and dependencies
- Javascript ES6 syntax (class, arrow function, spread operator)
- More GIT (integration with VSC, GitHub)
- API calls (using fetch in js)
- Handling JSON (access data with different formats)
- Simple search Algorithm (with data from API)
<!-- - Sketching UI (Used Lunacy) before coding the front end. I learned this the hard way; I did a total redesign of the project mid-way through. -->

## Color

The theme color of this site is changed each time a new quote is requested.  The excact value of the color is specified in HSL (hue, saturation, lightness). To ensure that the color has good contrast with the other elements, which are white, I have made a function that will randomly select an appropriate color.  By using these values for hue, saturation and lightness, the color has good contrast with white and is also "colorful".    

- **Hue** 0 - 360 (all colors)
- **Saturation** 30 - 100 (avoid low saturation to give more color to the site)
- **Lightness** 70 - 80 (avoid too low lightness to give good contrast, and too high to avoid dark colors)
- 

## Search

The movie quotes page has a search function. A searchbar and suggestion component is used on this page along with a search algorithm. The search algorithm will make an API call to the movie quote API and then base the suggestions on the data that it receives. The suggestions (and data) are divided into 6 different types:

- Actor
- Character
- Content (Quote)
- Category
- Movie
- Year (must be typed in full to give suggestion)

If a suggestion is choosed it will act as a filter for every new quote that is requested. E.g if "James Bond (Character)" is choosed in the suggestions each time a `New Quote` is pressed, only quotes with "James Bond" as a character will be displayed. This filter can be reset by using the "exit "icon in the searchbar. Other inputs in the search bar that is searched with the `enter` key, will act as a more general filter without the type specified. 



## Animation

In development...



## API's

Documentation about the API's I used for the quotes can be found in these links.

**Programming Quotes**: http://quotes.stormconsultancy.co.uk/api

**Movie Quotes**: https://juanroldan.com.ar/movie-quotes-api/#introduction

**Breaking Bad**: https://github.com/shevabam/breaking-bad-quotes

**Ron Swanson**: https://github.com/jamesseanwright/ron-swanson-quotes#ron-swanson-quotes-api