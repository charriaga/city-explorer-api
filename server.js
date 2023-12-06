/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', (request, response) => {
    response = data.find(function (element) {
        if (element.city_name === request.searchQuery && element.lat === request.lat && element.lon === request.lon) {
            return element;
        } else {
            return 'Error, cannot find city';
        }
    }
    );

    class Forecast {

        constructor(element) {
            this.date = element.valid_date;

            this.description = `A high of ${element.max_temp}, low of ${element.low_temp} with ${element.weather.description}`;
        }
    }


    const DaysArr = response.map((val)=> {
        val = new Forecast(val);
        return val;
    });
    response.json('daysArr');

});

app.listen(PORT, () => console.log('server is listening'));
