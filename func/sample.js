/**
 * Created by malsha_h on 8/3/2017.
 */

var casper = require('casper');
casper.start('http://localhost:63342/Back5/public/app/views/index.html');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo('Second Page: ' + this.getTitle());
});

casper.run();