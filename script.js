var bookA = require('./books.js');
var bookB = require('./books.js');
bookA.rate(10);
bookB.rate(20);
console.log(bookA.getPoints(), bookB.getPoints());

