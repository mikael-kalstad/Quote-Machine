import data from './Inspiration_data.json';

export default (filter) => {
   let randomNum = Math.round(Math.random()*(data.length-1));
   
   if (filter != undefined && filter.length === 2) {
      if (filter[0] === "quote") return new Promise(resolve => resolve([filter[0], filter[1]]));

      for (let i = 0; i < data.length; i++) {
         if (filter[0] === "Author" && hasContent(filter[1], data[i]["author"])) {
            return new Promise(resolve => resolve([data[i]["quote"], filter[1]]));
         }
      }
   } 

   return new Promise(resolve => resolve([data[randomNum]["quote"], data[randomNum]["author"]]));
}

// Check if content exist in text
const hasContent = (text, content) => {
   let regex = new RegExp(text, 'ig');
   return regex.test(content);
}