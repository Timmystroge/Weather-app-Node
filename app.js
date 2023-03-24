const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {
  const appId = "930ecb3c80068e06f0123661a07e2cdc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=lagos&appid=${appId}&units=metric`;

  /* make request */
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);/* Weather Data */
      const temp = weatherData.main.temp;/* Weather Temperature */
      const name = weatherData.name; /* City Name */
      const feels = weatherData.main.feels_like; /* What the weaher feels like */
      const description = weatherData.weather[0].description; /* Weather description */
      const icon = weatherData.weather[0].icon; /* Current weather icon */
      const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(
        `<h1>The temperature in ${name} is ${temp} degree celcius.</h1>`
      );
      res.write(`<p>The weather is currently ${description}</p>`);
      res.write(`<p><i>The weather feels like ${feels}</i></p>`);
      res.write(`<img src="${imageUrl}">`);
      /* send data to user */
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
