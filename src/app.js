const express = require('express')

const app = express()

app.get('/closest-locations', async (req, res) => {
  const { locations: locationNames } = req.query

  return res.send(locationNames)
})

module.exports = app
