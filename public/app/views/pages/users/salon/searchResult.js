/**
 * Created by malsha_h on 8/1/2017.
 */
    var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
    var text = "<div>";
    var i;
    for (i = 0; i < cars.length; i++) {
        text += "<p>"+cars[i]+"</p>";
    }
    text+="</div>";
    document.getElementById("searchResult").innerHTML = text;
var display = function (results) {

};