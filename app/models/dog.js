/**
 * Created by malsha_h on 7/17/2017.
 */
/**
 * Created by malsha_h on 7/13/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dogSchema = mongoose.Schema({
    name: String,
    age: String
});
var Dog = mongoose.model('Dog', dogSchema);