# Closest Locations API

This Express API has one endpoint `/closest-locations`, which expects a list of location names.
It returns a list of closest locations for each location. More info can be found in the [documentation](https://closest-locations.herokuapp.com/apidoc)

## Demo

The API is deployed on Heroku:
- Endpoint: https://closest-locations.herokuapp.com/closest-locations?locations=Berlin&locations=London&locations=Paris
- Docs: https://closest-locations.herokuapp.com/apidoc

## Requirements

For development, only Node.js needs to be installed in your environment.

## Install

    $ git clone https://github.com/mdauner/closest-location-backend.git
    $ cd closest-location-backend
    $ yarn install

## Set OpenCage Geocoder API Key

    $ export OPENCAGE_API_KEY=*your-api-key*

## Start & watch

    $ yarn dev

## Build API documention

    $ yarn apidoc
