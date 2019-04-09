const NodeGeocoder = require('node-geocoder')

const options = {
  provider: 'opencage',
  apiKey: process.env.OPENCAGE_API_KEY
}

module.exports = NodeGeocoder(options)
