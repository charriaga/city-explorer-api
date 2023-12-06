/* eslint-disable indent */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', (request, response) => {
    const query = request.query.searchQuery;
    const lat = request.query.lat;
    const lon = request.query.lon;
    let responseData;
    responseData = data.find((element) => {
        if (element.city_name === query && element.lat === lat && element.lon === lon) {
            return element;
        } else {
            return 'Error, cannot find city';
        }
    }
    );

    //ChatGPT was consulted for line 25
    const responseArr = Object.entries(responseData.data);

    class Forecast {

        constructor(element) {
            this.date = element[1].valid_date;

            this.description = (`A high of ${element[1].max_temp}, low of ${element[1].low_temp} with ${element[1].weather.description}`);
        }
    }


    const DaysArr = responseArr.map((val)=> {
        console.log(val);
        val = new Forecast(val);
        return val;
    });

    response.send(DaysArr);

});

app.listen(PORT, () => console.log('server is listening'));
