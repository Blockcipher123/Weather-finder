const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    // res.write(__dirname + "/style.css");
    // res.sendFile();

})

app.post("/", function (req, res) {
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "de3e2d514b3ae14c16931ca19e1a8f54";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const countryName = weatherData.sys.country;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p style='text-align: center; margin-top: 12%; font-size: 30px; color:rgb(214, 0, 214);'>The weather is currently " + weatherDiscription + " </p>");
            res.write("<h1 style='text-align: center; color: rgb(214, 0, 214);'>The temperature in " + req.body.cityName + " is " + temp + " degrees Celcius</h1>");
            res.write("<img style='display: block; margin-left: auto; margin-right: auto; width: 9%;' src=" + imgURL + ">")
            // res
            res.send();
        })
    })


})




app.listen(3000, function () {
    console.log("Server Started!");
})