//working with events
var BookClass = require("/books.js");
var book = new BookClass();
book.on('rated', function() {
    console.log('Rated with ' + book.getPoints());
});
book.rate(10);