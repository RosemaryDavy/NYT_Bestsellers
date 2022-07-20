//This code looks at the New York Times bestsellers lists for fiction and nonfiction books 
//retrieves the title, author, publisher, and number of weeks the title has been on the list.
//At the time of this project, the data retrieved was for July 10, 2022, and that is what I
//visualized on my Tableau Public.

const axios = require('axios').default;
const cheerio = require('cheerio')

const urls = [`https://www.nytimes.com/books/best-sellers/combined-print-and-e-book-fiction/`, 
`https://www.nytimes.com/books/best-sellers/combined-print-and-e-book-nonfiction/`];

let url = urls[0];

for (i=1; i<=url.length; i++){
  axios.get(url)
    .then(response => {
      const html = response.data
      const books =[];
      const $ = cheerio.load(html) 
      $('.css-xe4cfy').each(function(i, element){
        const $element = $(element);
        const $title = $element.find('.css-xe4cfy h3');
        const $author = $element.find('p.css-hjukut');
        const $weeks =$element.find('p.css-1o26r9v');
        const $publisher =$element.find('p.css-heg334');
        
        const book = {
            Title: $title.text(),
            Author: $author.text(),
            Weeks: $weeks.text(),
            Publisher: $publisher.text()
        };
        books.push(book);

        return books; 
      });
      console.log(books);

    }) }
