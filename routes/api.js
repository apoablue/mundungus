/*
 * Copyright 2017 PGI Time Ltd.
 *
 */

const api = exports

//Config
const config = require('../config/server_config')

//Node modules
const express = require('express')
const bodyParser = require('body-parser')

var apiRoutes = express.Router()
apiRoutes.use(bodyParser.json())

/**
 * Set no cache to prevent IE saving API responses
 */
apiRoutes.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache')
  res.header('Pragma', 'no-cache')
  next()
})

/**
 * Universal error handling. Any routes further up that call next(err) will be
 * processed here
 */
apiRoutes.use((err, req, res, next) => {
  console.log('Error', err)

  if (res.headersSent) {
    //This error has occurred after the API has returned something to the
    //user, just log it
    console.error('Error after response sent: ', err)
  } else {
    res.statusCode = 500
    res.json(err)
  }
})

api.getRoute = () => {
  return apiRoutes
}
