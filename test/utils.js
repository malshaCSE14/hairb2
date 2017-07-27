/**
 * Created by malsha_h on 7/25/2017.
 */
var responseValidator = function (expectedStatusCode, validationFunction) {
    return {
        json: function (statusCode, data) {
            statusCode.should.equal(expectedStatusCode);
            validationFunction(data);
        },
        send: function (statusCode, data) {
            statusCode.should.equal(expectedStatusCode);
            validationFunction(data);
        }
    }
};
module.exports = responseValidator;