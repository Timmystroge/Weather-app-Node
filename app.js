const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
/* dotenv to load .env files */
require("dotenv").config();

const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

// handle index page request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// handle /getWeather route request
app.get("/getWeather", function (req, res) {
  res.redirect("/");
});

// handle /getWeather post request
app.post("/getWeather", urlencodedparser, function (req, res) {
  //   get user input city name
  let userCityName = req.body.cityName;

  //   app endpoint details

  const appId = process.env.APIURL;
  const unit = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCityName}&appid=${appId}&units=${unit}`;

  /* make request */
  https.get(url, function (response) {
    const requestStatus = response.statusCode;

    response.on("data", function (data) {
      if (requestStatus === 200) {
        const weatherData = JSON.parse(data); /* Weather Data */

        const temp = weatherData.main.temp; /* Weather Temperature = cloudy */
        const name = weatherData.name; /* City Name = lagos*/
        const feels =
          weatherData.main.feels_like; /* What the weaher feels like = string*/
        const description =
          weatherData.weather[0].description; /* Weather description = string*/
        const icon =
          weatherData.weather[0].icon; /* Current weather icon  = int*/
        const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        res.write(`<p>The Weather Condition in ${userCityName}</p>`);
        res.write(
          `<h1>The temperature in ${name} is ${temp} degree celcius.</h1>`
        );
        res.write(`<p>The weather is currently ${description}</p>`);
        res.write(`<p><i>Today weather feels ${feels}</i></p>`);
        res.write(`<img src="${imageUrl}">`);

        /* send data to user */
        res.send();
      } else {
        res.send("Oops! Something went wrong!, Please try again");
      }
    });
  });
});

app.listen(3000 || 3000, () => {
  console.log(
    "server is running on port 3000"
  );
});

// Export the Express API
module.exports = app;
