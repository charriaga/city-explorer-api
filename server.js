/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;
const WEATHERAPI = process.env.WEATHER_API_KEY;

app.get('/weather', async function (request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let responseData;

    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${WEATHERAPI}`;

    try {
        responseData = await axios.get(url);

    } catch (error) {
        console.log('error');
    }

    console.log(responseData.data.data[0].temp);

    function description(responseArr) {
        let descriptionStrings = [];
        if (responseArr.clouds < 40) {
            descriptionStrings.push('Clear skies');
        } else if ((responseArr.clouds > 40) && (responseArr.clouds < 70)) {
            descriptionStrings.push('Some clouds');
        } else {
            descriptionStrings.push('Cloudy');
        }
        if (responseArr.precip < 20) {
            descriptionStrings.push(' no rain');
        } else if ((responseArr.precip > 20) && (responseArr.precip < 40)) {
            descriptionStrings.push(' some rain');
        } else {
            descriptionStrings.push(' rainy');
        }
        if (responseArr.snow <20) {
            descriptionStrings.push(' with no snow.');
        } else {
            descriptionStrings.push(' and snowing.');
        }
        return descriptionStrings;
    }

    let describe = description(responseData.data.data[0]).join('');

    function Forecast(element) {
        this.date = element.data.data[0].ob_time;

        this.description = (`It is ${element.data.data[0].temp}. ${description(describe)} Sunrise is at ${element.data.data[0].sunrise}, and sunset is at ${element.data.data[0].sunset}.`);
    }
    const val = new Forecast(responseData);

    console.log(val);
    response.send(val);

});

app.listen(PORT, () => console.log('server is listening'));
