import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import logger from 'morgan'
import { router } from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()

// Use the morgan logger
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev', { immediate: true }))
}

// Use helmet as a basic protection layer
app.use(helmet())

// Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:5173',
}))

// Be more silent
app.disable('x-powered-by')

// Use the public folder for static resources
app.use(express.static('../../client/dist'))

// Middleware to parse JSON data as part of the body
app.use(express.json())

// Mount the routes
app.use('/', router)

// Redirect to index.html for unknown routes
app.use((req, res, next) => {
  res.sendFile('index.html', { root: './client/dist' }, (err) => {
    if (err) {
      next(err)
    }
  })
})

// Middleware for 404
app.use(errorHandler.notFoundDefault)

// Global Error Handler
app.use(errorHandler.errorDefault)
