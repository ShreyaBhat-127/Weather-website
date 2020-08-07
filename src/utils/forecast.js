const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d4025e9a70d4e020fcbe56d1dd6ba0a6&query=' + latitude + ',%' + longitude
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if(body.success === false) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '.')
        }
    })
}

module.exports = forecast