/**
 * Created by malsha_h on 8/3/2017.
 */
var casper = require('casper').create();
casper.start('http://localhost:8080/signin');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());
});

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo('Second Page: ' + this.getTitle());
// });
casper.run();