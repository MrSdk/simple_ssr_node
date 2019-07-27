const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
var path = require("path")

var enforce = require('express-sslify');

var app = express()
var router = express.Router()
var geohash = require("geohash").GeoHash;


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', router)

// route routing is very easy with express, this will handle the request for root directory contents.
// :id is used here to pattern match with the first value after the forward slash.
app.get("/map/:id", function(req, res) {
    //decode the geohash with geohash module ID => gcpvj0fb970t1
    var latlon = geohash.decodeGeoHash(req.params["id"]);
    console.log("latlon : " + latlon);
    var lat = latlon.latitude[2];
    console.log("lat : " + lat);
    var lon = latlon.longitude[2];
    console.log("lon : " + lon);
    zoom = req.params["id"].length + 2;
    console.log("zoom : " + zoom);
    // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
    res.render("map.ejs", { layout: false, lat: lat, lon: lon, zoom: zoom, geohash: req.params["id"] });
});


app.get('/', (req, res) => {
    res.render("index", {
        people: [
            { name: "Sdk" },
            { name: "John" },
            { name: "Sam" },
        ]
    })
})

module.exports = app