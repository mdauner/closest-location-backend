const { cache, getLocationFromCacheOrGeocode } = require('../utils')

afterEach(() => {
  cache.flushAll()
})

describe('getLocationFromCacheOrGeocode', () => {
  it('should store location in cache', async () => {
    const location = await getLocationFromCacheOrGeocode('Berlin')
    expect(cache.get('Berlin')).toEqual(location)
  })

  it('should get location from cache', async () => {
    cache.set('Berlin', 'cachedLocation')
    const location = await getLocationFromCacheOrGeocode('Berlin')
    expect(location).toBe('cachedLocation')
  })
})
