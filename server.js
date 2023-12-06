/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', (request, response) => {
    let responseData;
    responseData = data.find(function (element) {
        if (element.city_name === request.searchQuery && element.lat === request.lat && element.lon === request.lon) {
            return element;
        } else {
            return 'Error, cannot find city';
        }
    }
    );

    //ChatGPT was consulted for line 24
    const responseArr = Object.entries(responseData.data);

    class Forecast {

        constructor(element) {
            this.date = element.valid_date;

            this.description = (`A high of ${element.max_temp}, low of ${element.low_temp} with ${element.weather.description}`);
        }
    }


    const DaysArr = responseArr.map((val)=> {
        console.log(val[1]);
        val = new Forecast(val[1]);
        return val;
    });

    response.send(DaysArr);

});

app.listen(PORT, () => console.log('server is listening'));
