const express = require('express')
const geolib = require('geolib')
const { getLocationFromCacheOrGeocode } = require('./utils.js')

const app = express()

app.get('/closest-locations', async (req, res) => {
  const { locations: locationNames } = req.query

  if (!Array.isArray(locationNames)) {
    return res
      .status(400)
      .send('two location names are required to calculate closest locations')
  }

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

  if (Object.keys(locationsByName).length < 2) {
    return res
      .status(400)
      .send('two valid locations are required to calculate closest locations')
  }

  const data = Object.keys(locationsByName).map(name => ({
    location: name,
    closestLocation: geolib.findNearest(
      locationsByName[name],
      locationsByName,
      1
    ).key
  }))

  return res.send(data)
})

module.exports = app
