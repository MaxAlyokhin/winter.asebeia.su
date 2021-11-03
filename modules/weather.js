const got = require('got')

const config = require('../config.json')

const key = config.key
const units = 'metric'

async function weather(latitude, longitude, responce) {
  const api = 'https://api.openweathermap.org/data/2.5/weather'

  const { body } = await got(api, {
    searchParams: {
      lat: latitude,
      lon: longitude,
      appid: key,
      units: units,
    },
    responseType: 'json',
  })

  const weather = { temperature: body.main.temp, image: body.weather[0].icon }

  responce.status(200)
  responce.send(JSON.stringify(weather))
}

module.exports = weather
