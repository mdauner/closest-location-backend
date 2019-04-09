const geocoder = require('./geocoder.js')

async function getLocation(locationName) {
  try {
    const location = (await geocoder.geocode(locationName))[0]
    return location
  } catch (e) {
    console.error(e)
    return null
  }
}

module.exports = {
  getLocation
}
