/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT;
const WEATHERAPI = process.env.WEATHER_API_KEY;

async function getWeather() { }

app.get('/weather', async function (request, response) {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let responseData;

    const url = `http://api.weatherbit.io/v2.0/current?${WEATHERAPI}&lang=en&lat=${lat}&lon=${lon}`;

    try {
        responseData = await axios.get(url);
        console.log(responseData);

    } catch (error) {
        console.log('error');
    }


    //ChatGPT was consulted for line 24
    const responseArr = Object.entries(responseData.data);

    class Forecast {

        constructor(element) {
            this.date = element[1].valid_date;

            this.description = (`A high of ${element[1].max_temp}, low of ${element[1].low_temp} with ${element[1].weather.description}`);
        }
    }


    const DaysArr = responseArr.map((val) => {
        console.log(val);
        val = new Forecast(val);
        return val;
    });

    response.send(DaysArr);

});

getWeather();

app.listen(PORT, () => console.log('server is listening'));
