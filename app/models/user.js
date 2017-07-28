/**
 * Created by malsha_h on 7/13/2017.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var passwordHash    = require('password-hash');
var titlize         = require('mongoose-title-case');

var userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // active: {type:Boolean, required:true, default:false },
    // temporarytoken : {type: String, required:true },
    profile : { //stylist profile
        description : {type: String},
        jobcategories: {
            educator : {
                isset :{type: Boolean},
                rate : {type: Number}
            },
            stylist : {
                isset :{type: Boolean},
                rate : {type: Number}
            },
            apperentice : {
                isset :{type: Boolean},
                rate : {type: Number}
            }
        },

        address: {type: String},
        city: {type: String},
        skills : {
            haircutting : {type : Boolean},
            coloring : {type : Boolean},
            rebonding : {type : Boolean},
            hairrelaxing : {type : Boolean},
            straightening : {type : Boolean},
            hairstyling : {type : Boolean},
            cleansing : {type : Boolean},
            scalpmassage : {type : Boolean},
            oiltreatments : {type : Boolean},
            haircareadvising : {type : Boolean},
            haircurling : {type : Boolean},
            perming : {type : Boolean}
        }

    },
    salonProfiles : [
        {
            name: {type: String},
            description : {type: String},
            address: {type: String},
            city : {type: String}
        }
    ]
});
// userSchema.plugin(titlize, {
//     paths: [ 'firstname']
// });

userSchema.methods.comparePassword =function (password) {
    return passwordHash.verify(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// make this available to our users in our Node applications