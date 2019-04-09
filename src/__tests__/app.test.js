const request = require('supertest')
const app = require('../app')

describe('/closest-locations', () => {
  it('should require a locations query parameter', done => {
    request(app)
      .get('/closest-locations')
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe(
          'two location names are required to calculate closest locations'
        )
        done()
      })
  })

  it('should return error message if less than two location names are valid', done => {
    request(app)
      .get('/closest-locations')
      .query({
        locations: ['Berlin', 'asdfasdf']
      })
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe(
          'two valid locations are required to calculate closest locations'
        )
        done()
      })
  })
  it('should return closest locations', done => {
    request(app)
      .get('/closest-locations')
      .query({
        locations: ['Berlin', 'Paris', 'The Statue of Liberty']
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.text)).toEqual([
          {
            closestLocation: 'Paris',
            distance: 878606,
            location: 'Berlin'
          },
          {
            closestLocation: 'Berlin',
            distance: 878606,
            location: 'Paris'
          },
          {
            closestLocation: 'Paris',
            distance: 5857061,
            location: 'The Statue of Liberty'
          }
        ])
        done()
      })
  })
})
