const express = require('express')
const { getLocationFromCacheOrGeocode } = require('./utils.js')

const app = express()

app.get('/closest-locations', async (req, res) => {
  const { locations: locationNames } = req.query

  const locations = await Promise.all(
    locationNames.map(getLocationFromCacheOrGeocode)
  )
  const locationsByName = {}

  locationNames.forEach((name, index) => {
    if (!locations[index]) {
      return
    }
    // eslint-disable-next-line prefer-destructuring
    locationsByName[name] = locations[index]
  })

  return res.send(locationsByName)
})

module.exports = app
