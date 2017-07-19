/**
 * Created by malsha_h on 7/13/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittySchema = mongoose.Schema({
    name: String
});
var Kitten = mongoose.model('Kitten', kittySchema);