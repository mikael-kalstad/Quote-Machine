updateFilter = (arr) => {
    // for (let key in this.state.movieFilter) {
    //     if (this.state.movieFilter[key][1] === arr[1]) return false;
    // }

    // let filter = this.state.movieFilter;
    // let filterIDs = Object.keys(filter);

    // arr[0] = arr[0].toLowerCase().trim();
    // arr[1] = arr[1].toLowerCase().trim().split(' ').join('-');

    // if (filterIDs.length === 0) {
    //     this.setState(prevState => ({
    //         movieFilter: {
    //             ...prevState.movieFilter,
    //             [this.uniqueID()]: arr
    //         }
    //     }));
    // }

    // for (let i = 0; i < filterIDs.length; i++) {
    //     // If type is the same, e.g actor or category
    //     if (filter[filterIDs[i]][0] === arr[0]) {
    //         // Check for value duplicate
    //         let checker = true;
    //         let values = filter[filterIDs[i]][1].split(",");

    //         values.forEach(item => {
    //             if (item === arr[1]) checker = false;
    //         });

    //         if (!checker) break;

    //         this.setState(prevState => ({
    //             movieFilter: {
    //                 ...prevState.movieFilter,
    //                 [filterIDs[i]]: [arr[0], prevState.movieFilter[filterIDs[i]][1] + "," + arr[1]] 
    //             }
    //         }));
    //         break;
    //     }
    // }
    
    arr[0] = arr[0].toLowerCase().trim();
    arr[1] = arr[1].toLowerCase().trim().split(' ').join('-');

    this.setState({ movieFilter: arr })
   
}

getSpecificMovieQuote = () => {        
    // let filterLink = 'http://movie-quotes-app.herokuapp.com/api/v1/quotes?';
    // let filter = this.state.movieFilter;
    // let filterIDs = Object.keys(filter);
    // console.log("filter", filter);
    
    // // TODO differanciate between movies 

    // for (let item = 0; item < filterIDs.length; item++) { 
    //     filterLink +=  filter[filterIDs[item]][0] + "s[]=";
    //     let values = filter[filterIDs[item]][1].split(',');

    //     for (let i = 0; i < values.length; i++) {
    //         filterLink += values[i];
    //         if (i !== values.length-1) filterLink += ",";
    //     }
        
    //     if (item !== (filterIDs.length-1)) filterLink += "&";
    // }
    let key = Object.keys(this.state.movieFilter);
    let filterLink = 'http://movie-quotes-app.herokuapp.com/api/v1/quotes?'+
                      this.state.movieFilter[0]+"="+this.state.movieFilter[1]
    fetch (filterLink, {
    headers: {
        "authorization": "Token token=1iVrE8HF2I6SHudxkWKJKQtt"
    }})
    .then(res => res.json())
    .then(data => this.updateMovieState(data))
}