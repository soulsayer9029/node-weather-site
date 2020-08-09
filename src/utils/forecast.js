const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url= `http://api.weatherstack.com/current?access_key=011e6085b4e1a46698d926fccde5a895&query=${lattitude},${longitude}`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' It is currently ' + response.body.current.temperature +'degrees out.It feels like'+response.body.current.feelslike)
        }
    })
}

module.exports = forecast
