const express = require('express')
const { getLocation } = require('./utils.js')

const app = express()

app.get('/closest-locations', async (req, res) => {
  const { locations: locationNames } = req.query

  const locations = await Promise.all(locationNames.map(getLocation))
  const locationsByName = {}

  locationNames.forEach((name, index) => {
    // eslint-disable-next-line prefer-destructuring
    locationsByName[name] = locations[index]
  })

  return res.send(locationsByName)
})

module.exports = app
