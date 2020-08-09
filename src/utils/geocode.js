
const request = require('request')

const geocode = (address, callback) => {
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGhydXZqYWluOTAyOSIsImEiOiJja2Q3YnZ6bWIwM3h2MnFudnB0OHFoYzR1In0.1_vjQ7xS8LuIDoRJbIlKiA&limit=1`
    request({ url, json: true }, (error,response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
