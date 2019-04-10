const express = require('express')
const cors = require('cors')
const geolib = require('geolib')
const { getLocationFromCacheOrGeocode } = require('./utils.js')

const app = express()

app.use(cors())

app.use(express.static('public'))

/**
 * @api {get} /closest-locations Request closest locations
 * @apiName ClosestLocations
 * @apiGroup Locations
 *
 * @apiParam {String[]} locations List of location names, e.g. Berlin', 'The Statue of Liberty'.
 *
 * @apiSuccess {Object[]} - List of closest location parts.
 * @apiSuccess {String}   -.location The location name.
 * @apiSuccess {String}   -.closestLocation The name of the closest location.
 * @apiSuccess {Number}   -.distance The distance to the closest location (in meter).
 * @apiSuccessExample {json} Success
 *  HTTP/1.1 200 OK
 *    [{
 *      location: 'Berlin',
 *      closestLocation: 'Paris',
 *      distance: 878606
 *    },
 *    {
 *      location: 'The Statue of Liberty',
 *      closestLocation: 'Paris',
 *      distance: 5857061
 *    },
 *    {
 *      location: 'Paris',
 *      closestLocation: 'Berlin',
 *      distance: 878606
 *    }]
 */
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

  const data = Object.keys(locationsByName).map(name => {
    const closestLocation = geolib.findNearest(
      locationsByName[name],
      locationsByName,
      1
    )
    return {
      location: name,
      closestLocation: closestLocation.key,
      distance: closestLocation.distance
    }
  })

  return res.send(data)
})

module.exports = app
