const NodeCache = require('node-cache')
const geocoder = require('./geocoder.js')

const cache = new NodeCache()

async function getLocationFromCacheOrGeocode(locationName) {
  try {
    const cachedLocation = await cache.get(locationName)
    if (cachedLocation) {
      return cachedLocation
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const location = (await geocoder.geocode(locationName))[0]
    cache.set(locationName, location)
    return location
  } catch (e) {
    console.error(e)
    return null
  }
}

module.exports = {
  getLocationFromCacheOrGeocode
}
